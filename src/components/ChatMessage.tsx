import { User, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/services/mockApi';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  // Simple markdown-like rendering for bold and code blocks
  const renderContent = (content: string) => {
    // Split by code blocks first
    const parts = content.split(/```[\s\S]*?```/);
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    
    return parts.map((part, index) => (
      <span key={index}>
        {/* Render text with bold support */}
        {part.split(/\*\*(.*?)\*\*/g).map((segment, i) => 
          i % 2 === 1 ? (
            <strong key={i} className="font-semibold text-foreground">{segment}</strong>
          ) : (
            <span key={i}>{segment}</span>
          )
        )}
        {/* Render code block if exists */}
        {codeBlocks[index] && (
          <pre className="my-3 p-3 rounded-lg bg-muted/50 text-sm overflow-x-auto font-mono">
            <code>{codeBlocks[index].replace(/```\w*\n?/g, '').replace(/```$/g, '')}</code>
          </pre>
        )}
      </span>
    ));
  };
  
  return (
    <div 
      className={`flex gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary' : 'bg-accent'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>
      
      {/* Message bubble */}
      <div 
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'message-user rounded-tr-md' 
            : 'message-ai rounded-tl-md shadow-soft'
        }`}
      >
        <div className="text-foreground text-[15px] leading-relaxed whitespace-pre-wrap">
          {renderContent(message.content)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
