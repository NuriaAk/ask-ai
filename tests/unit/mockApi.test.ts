import { describe, it, expect, vi } from "vitest";
import {
  sendMessage,
  createUserMessage,
  type UserMode,
  type ChatMessage,
} from "./mockApi";

describe("mockApi", () => {
  describe("createUserMessage", () => {
    it("should create a user message with correct properties", () => {
      const content = "Test message";
      const message = createUserMessage(content);

      expect(message.content).toBe(content);
      expect(message.role).toBe("user");
      expect(message.id).toBeDefined();
      expect(message.timestamp).toBeInstanceOf(Date);
    });

    it("should generate unique IDs for each message", () => {
      const message1 = createUserMessage("First message");
      const message2 = createUserMessage("Second message");

      expect(message1.id).not.toBe(message2.id);
    });
  });

  describe("sendMessage", () => {
    it("should return a technical response for technical mode", async () => {
      vi.useFakeTimers();
      const responsePromise = sendMessage("What is an AI agent?", "technical");
      
      vi.advanceTimersByTime(2000);
      const response = await responsePromise;

      expect(response.role).toBe("assistant");
      expect(response.content).toContain("AI Agents");
      expect(response.content).toContain("architectural");
      
      vi.useRealTimers();
    });

    it("should return a non-technical response for non-technical mode", async () => {
      vi.useFakeTimers();
      const responsePromise = sendMessage("What is an AI agent?", "non-technical");
      
      vi.advanceTimersByTime(2000);
      const response = await responsePromise;

      expect(response.role).toBe("assistant");
      expect(response.content).toContain("AI agent");
      expect(response.content).toContain("digital assistant");
      
      vi.useRealTimers();
    });

    it("should return coordination response when question includes 'coordinate'", async () => {
      vi.useFakeTimers();
      const responsePromise = sendMessage(
        "How do agents coordinate?",
        "technical"
      );
      
      vi.advanceTimersByTime(2000);
      const response = await responsePromise;

      expect(response.content).toContain("coordination");
      
      vi.useRealTimers();
    });

    it("should return coordination response when question includes 'together'", async () => {
      vi.useFakeTimers();
      const responsePromise = sendMessage(
        "How do agents work together?",
        "non-technical"
      );
      
      vi.advanceTimersByTime(2000);
      const response = await responsePromise;

      expect(response.content).toContain("team");
      
      vi.useRealTimers();
    });

    it("should return a message with valid structure", async () => {
      vi.useFakeTimers();
      const responsePromise = sendMessage("Test question", "technical");
      
      vi.advanceTimersByTime(2000);
      const response = await responsePromise;

      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("role", "assistant");
      expect(response).toHaveProperty("content");
      expect(response).toHaveProperty("timestamp");
      expect(response.timestamp).toBeInstanceOf(Date);
      
      vi.useRealTimers();
    });
  });
});
