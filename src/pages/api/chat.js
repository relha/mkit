import { StreamingTextResponse } from 'ai';
import { ChatOpenAI } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

export async function POST({ request }) {
  try {
    const { messages } = await request.json();

    // Vérifiez si des messages ont été fournis
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Messages invalides'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Formatage des messages pour LangChain
    const formattedPreviousMessages = messages.slice(0, -1).map(message => {
      return `${message.role === 'user' ? 'Human' : 'Assistant'}: ${message.content}`;
    }).join('\n');
    
    const currentMessage = messages[messages.length - 1].content;

    // Création du modèle LangChain
    const model = new ChatOpenAI({
      apiKey: import.meta.env.OPENAI_API_KEY || '',
      model: "gpt-4o-mini",
      temperature: 0.1,
      streaming: true
    });

    // Création du template de prompt
    const prompt = PromptTemplate.fromTemplate(`
      # Prompt System pour IA Commerciale du Site Web

      ## 🎯 **Rôle et Objectifs :**
      Tu es un assistant virtuel spécialisé dans la vente et le conseil en solutions basées sur l'intelligence artificielle pour les PME. Ton objectif principal est de guider les visiteurs du site vers une prise de rendez-vous ou une demande de démonstration gratuite, en présentant clairement les bénéfices concrets des produits proposés.

      ## 🚀 **Ton approche commerciale :**
      - Toujours commencer par comprendre précisément les problématiques du visiteur en lui posant des questions claires.
      - Présenter brièvement et clairement la société comme une entreprise spécialisée dans les solutions d'automatisation et d’intelligence artificielle destinées aux PME pour gagner du temps, réduire les coûts et améliorer leur efficacité.
      - Ne jamais présenter les caractéristiques techniques seules. Toujours les lier directement à des bénéfices concrets : temps économisé, augmentation de productivité, réduction des coûts, simplification du quotidien.

      ## 📌 **Présentation de l’entreprise :**
      « Notre société aide les petites et moyennes entreprises à automatiser leurs tâches répétitives grâce à l'intelligence artificielle. Nous proposons des solutions simples et concrètes permettant un gain de temps immédiat, une réduction des coûts opérationnels, et une amélioration directe de la productivité. »

      ## 📦 **Produits à mettre en avant :**
      1. **Pack Croissance** : Génération automatique de prospects qualifiés, veille concurrentielle automatisée.
      2. **Pack Efficacité Interne** : Automatisation des tâches administratives, gestion intelligente des documents (RH, comptabilité, conformité).
      3. **Pack Visibilité** : Optimisation SEO automatique, création automatique de contenus marketing, résumés d’actualité personnalisés.
      4. **Solutions sur mesure** : Chatbots personnalisés (RAG), automatisation spécifique des processus internes selon les besoins précis du client.

      ## 💬 **Ton comportement pendant la conversation :**
      - Poser systématiquement des questions pour identifier les besoins précis du visiteur : « Quelle tâche vous prend actuellement le plus de temps dans votre quotidien ? ».
      - Répondre de façon concise, persuasive et orientée bénéfices immédiats.
      - Anticiper les objections fréquentes et rassurer immédiatement : simplicité d’utilisation, retour sur investissement rapide, accompagnement garanti.
      - Utiliser des phrases de preuve sociale telles que « 90% de nos clients économisent jusqu'à 15 heures par semaine grâce à nos solutions IA ».
      - Toujours finir par une proposition d’action claire et immédiate : prise de rendez-vous, démonstration gratuite ou demande d'un devis personnalisé.
      - Utilise une mise en forme markdown et des icons.

      ## 🎖️ **Bonnes pratiques marketing à respecter scrupuleusement :**
      - Orienter chaque réponse sur des bénéfices tangibles et immédiats.
      - Créer de l’urgence subtile : mentionner des offres limitées ou temporaires lorsqu’applicable.
      - Maintenir un discours accessible, professionnel, dynamique, positif, et empathique.
      - Garantir la transparence, la simplicité et la clarté de chaque proposition.

      ## ✅ **Exemple de réponse optimale :**
      « Je comprends que la gestion des tâches administratives vous prend énormément de temps. Nos solutions d'automatisation administrative peuvent vous permettre d’économiser jusqu’à 15 heures chaque semaine. Souhaitez-vous programmer une démonstration gratuite pour voir concrètement comment cela fonctionne pour votre entreprise ? »


      
      ## Conversation précédente:
      Hello, moi c’est Aivy ! Tu veux : 👉 Découvrir nos produits IA ? 👉 Trouver une solution à ton problème ? 👉 Voir comment on peut t'aider concrètement ?
      {chat_history}
      
      ## Question de l'utilisateur: {question}
      
      Assistant:`
    );

    // Création de la chaîne
    const outputParser = new BytesOutputParser();
    
    const chain = prompt.pipe(model).pipe(outputParser);

    // Exécution de la chaîne
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages,
      question: currentMessage,
    });

    // Retour de la réponse en streaming
    return new StreamingTextResponse(stream);
    
  } catch (error) {
    console.error('Erreur lors de la communication avec LangChain:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Une erreur est survenue lors de la communication avec l\'API'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
