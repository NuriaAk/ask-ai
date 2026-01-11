import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendMessage, createUserMessage } from "@/services/api";

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
    const mockFetch = vi.fn();

    beforeEach(() => {
      vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should send the request and parse a technical response", async () => {
      const payload = {
        id: "msg-1",
        role: "assistant",
        content: "GraphRAG response (technical): Example context.",
        timestamp: "2024-01-01T00:00:00Z",
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(payload),
      });

      const response = await sendMessage("What is an AI agent?", "technical");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/chat\/messages$/),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: "What is an AI agent?",
            mode: "technical",
          }),
        })
      );
      expect(response.role).toBe("assistant");
      expect(response.content).toContain("GraphRAG response");
      expect(response.timestamp).toBeInstanceOf(Date);
    });

    it("should throw when the backend responds with an error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: vi.fn().mockResolvedValue({
          error: "bad_request",
          message: "Question must not be empty.",
        }),
      });

      await expect(
        sendMessage("   ", "non-technical")
      ).rejects.toThrow("Question must not be empty.");
    });
  });
});
