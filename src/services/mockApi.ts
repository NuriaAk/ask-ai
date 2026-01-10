// Centralized mock API service - replace with real API calls later

export type UserMode = 'technical' | 'non-technical';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Mock responses based on user mode
const technicalResponses: Record<string, string> = {
  default: `**AI Agents** are autonomous systems that perceive their environment, make decisions, and take actions to achieve specific goals.

Key architectural components:
- **Perception Layer**: Processes inputs (text, images, sensor data)
- **Reasoning Engine**: LLM-based decision making with chain-of-thought
- **Memory**: Short-term (context window) and long-term (vector stores)
- **Tool Use**: API calls, code execution, web browsing
- **Planning**: Task decomposition and goal-oriented behavior

Popular frameworks include LangChain, AutoGPT, and CrewAI for multi-agent orchestration.`,
  
  coordinate: `Multi-agent coordination typically uses these patterns:

1. **Hierarchical**: A manager agent delegates to specialist workers
2. **Peer-to-Peer**: Agents communicate via message passing
3. **Blackboard**: Shared memory space for async collaboration

For implementation, consider:
\`\`\`
Agent A → Task Queue → Agent B
         ↓
    Shared State
\`\`\`

Tools like CrewAI and Microsoft AutoGen provide built-in coordination primitives.`,
};

const nonTechnicalResponses: Record<string, string> = {
  default: `Think of an **AI agent** like a helpful digital assistant that can actually *do things* for you, not just answer questions.

**Here's a simple way to understand it:**

🤖 A regular chatbot just talks
🚀 An AI agent can talk AND take action

**For example**, an AI agent could:
- Research a topic and summarize findings
- Book appointments in your calendar
- Compare prices and make recommendations
- Help you write and send emails

They're designed to work more independently, almost like having a capable assistant who figures out the steps needed to complete a task.`,

  coordinate: `Great question! When multiple AI agents work together, it's a bit like a team at work.

**Imagine a project team:**
- One person manages and assigns tasks
- Others are specialists (researcher, writer, reviewer)
- They share information and check each other's work

AI agents can work the same way! One "manager" agent breaks down big tasks and assigns them to helper agents who each have different skills.

It's pretty cool technology that's helping automate complex workflows.`,
};

function findBestResponse(question: string, mode: UserMode): string {
  const responses = mode === 'technical' ? technicalResponses : nonTechnicalResponses;
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('coordinate') || lowerQuestion.includes('together') || lowerQuestion.includes('multi')) {
    return responses.coordinate;
  }
  
  return responses.default;
}

// Simulates API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendMessage(
  question: string, 
  mode: UserMode
): Promise<ChatMessage> {
  // Simulate network delay
  await delay(800 + Math.random() * 700);
  
  const response = findBestResponse(question, mode);
  
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: response,
    timestamp: new Date(),
  };
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    timestamp: new Date(),
  };
}
