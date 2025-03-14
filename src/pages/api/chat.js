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
      apiKey: process.env.OPENAI_API_KEY || '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',
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      streaming: true
    });

    // Création du template de prompt
    const prompt = PromptTemplate.fromTemplate(`
      Tu es un assistant IA professionnel et utile.
      
      Conversation précédente:
      {chat_history}
      
      Question de l'utilisateur: {question}
      
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
