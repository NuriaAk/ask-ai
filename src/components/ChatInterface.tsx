import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { sendMessage, createUserMessage, type ChatMessage as ChatMessageType, type UserMode } from '@/services/mockApi';
import ChatMessage from './ChatMessage';

interface ChatInterfaceProps {
  mode: UserMode;
  onBack: () => void;
}

const ChatInterface = ({ mode, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const placeholderText = mode === 'technical' 
    ? 'Ask a question like: How do autonomous agents coordinate tasks?'
    : 'Ask a question like: What is an AI agent?';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = createUserMessage(input.trim());
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage.content, mode);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Failed to get response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto px-4">
      {/* Chat header */}
      <div className="flex items-center gap-3 py-4 border-b border-border/50">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h2 className="font-semibold text-foreground">
            {mode === 'technical' ? 'Technical Mode' : 'Explorer Mode'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'technical' 
              ? 'Detailed answers with code examples' 
              : 'Simple, friendly explanations'}
          </p>
        </div>
        <button
          onClick={onBack}
          className="ml-auto text-sm text-primary hover:underline"
        >
          Switch mode
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-3xl bg-accent flex items-center justify-center mb-4">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              No question is too simple
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {mode === 'technical' 
                ? 'Ask about architectures, frameworks, or implementation patterns.'
                : 'Curious about AI agents? Ask anything — I\'ll explain it simply.'}
            </p>
            
            {/* Suggested questions */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {(mode === 'technical' 
                ? ['How do agents use tools?', 'Multi-agent coordination patterns']
                : ['What is an AI agent?', 'How are agents different from chatbots?']
              ).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 rounded-full bg-muted hover:bg-accent text-sm text-foreground transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="message-ai rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
                  <span className="text-muted-foreground animate-pulse-soft">Thinking...</span>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="py-4 border-t border-border/50">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            rows={1}
            className="input-chat w-full pr-14 resize-none min-h-[56px] max-h-32"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
