import React, { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';

export default function ChatUI() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: 'Bonjour ! Je suis votre assistant IA propulsé par LangChain. Comment puis-je vous aider aujourd\'hui ?'
      }
    ]
  });
  
  const messagesEndRef = useRef(null);

  // Fonction pour faire défiler automatiquement vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Défilement automatique lorsque de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">Assistant IA (LangChain)</div>
        <div className="chatbot-status">En ligne</div>
      </div>
      
      <div className="chat-messages" id="chatMessages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role === 'user' ? 'user' : 'bot'}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-time">Maintenant</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Posez votre question..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
