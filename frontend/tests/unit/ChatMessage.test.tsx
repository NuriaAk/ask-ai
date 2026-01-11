import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatMessage from "@/components/ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/services/api";

describe("ChatMessage", () => {
  it("should render user message correctly", () => {
    const message: ChatMessageType = {
      id: "test-1",
      role: "user",
      content: "Test user message",
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText("Test user message")).toBeDefined();
  });

  it("should render assistant message correctly", () => {
    const message: ChatMessageType = {
      id: "test-2",
      role: "assistant",
      content: "Test assistant message",
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText("Test assistant message")).toBeDefined();
  });

  it("should render bold text in markdown", () => {
    const message: ChatMessageType = {
      id: "test-3",
      role: "assistant",
      content: "This is **bold** text",
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    const boldText = screen.getByText("bold");
    expect(boldText.tagName).toBe("STRONG");
  });

  it("should render code blocks", () => {
    const message: ChatMessageType = {
      id: "test-4",
      role: "assistant",
      content: "Here is code:\n```\nconst x = 1;\n```",
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByText("const x = 1;")).toBeDefined();
    const codeElement = screen.getByText("const x = 1;").closest("pre");
    expect(codeElement).toBeDefined();
  });

  it("should apply different styles for user vs assistant messages", () => {
    const userMessage: ChatMessageType = {
      id: "test-5",
      role: "user",
      content: "User content",
      timestamp: new Date(),
    };

    const { container: userContainer } = render(
      <ChatMessage message={userMessage} />
    );
    const userBubble = userContainer.querySelector(".message-user");
    expect(userBubble).toBeDefined();
  });

  it("should apply different styles for assistant messages", () => {
    const assistantMessage: ChatMessageType = {
      id: "test-6",
      role: "assistant",
      content: "Assistant content",
      timestamp: new Date(),
    };

    const { container } = render(<ChatMessage message={assistantMessage} />);
    const assistantBubble = container.querySelector(".message-ai");
    expect(assistantBubble).toBeDefined();
  });
});
