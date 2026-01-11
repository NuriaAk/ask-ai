import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInterface from "@/components/ChatInterface";
import * as mockApi from "@/services/mockApi";

// Mock the mockApi module
vi.mock("@/services/mockApi", async () => {
  const actual = await vi.importActual("@/services/mockApi");
  return {
    ...actual,
    sendMessage: vi.fn(),
  };
});

describe("ChatInterface", () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (mockApi.sendMessage as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "response-1",
      role: "assistant",
      content: "Test response",
      timestamp: new Date(),
    });
  });

  it("should render in technical mode with correct header", () => {
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    expect(screen.getByText("Technical Mode")).toBeDefined();
    expect(screen.getByText("Detailed answers with code examples")).toBeDefined();
  });

  it("should render in non-technical mode with correct header", () => {
    render(<ChatInterface mode="non-technical" onBack={mockOnBack} />);

    expect(screen.getByText("Explorer Mode")).toBeDefined();
    expect(screen.getByText("Simple, friendly explanations")).toBeDefined();
  });

  it("should display correct placeholder for technical mode", () => {
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(
      /How do autonomous agents coordinate tasks/i
    );
    expect(textarea).toBeDefined();
  });

  it("should display correct placeholder for non-technical mode", () => {
    render(<ChatInterface mode="non-technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(/What is an AI agent/i);
    expect(textarea).toBeDefined();
  });

  it("should call onBack when back button is clicked", () => {
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when switch mode is clicked", () => {
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const switchButton = screen.getByText("Switch mode");
    fireEvent.click(switchButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should display empty state when no messages", () => {
    render(<ChatInterface mode="non-technical" onBack={mockOnBack} />);

    expect(screen.getByText("No question is too simple")).toBeDefined();
  });

  it("should show suggested questions for non-technical mode", () => {
    render(<ChatInterface mode="non-technical" onBack={mockOnBack} />);

    expect(screen.getByText("What is an AI agent?")).toBeDefined();
    expect(
      screen.getByText("How are agents different from chatbots?")
    ).toBeDefined();
  });

  it("should show suggested questions for technical mode", () => {
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    expect(screen.getByText("How do agents use tools?")).toBeDefined();
    expect(
      screen.getByText("Multi-agent coordination patterns")
    ).toBeDefined();
  });

  it("should populate input when suggestion is clicked", async () => {
    render(<ChatInterface mode="non-technical" onBack={mockOnBack} />);

    const suggestion = screen.getByText("What is an AI agent?");
    fireEvent.click(suggestion);

    const textarea = screen.getByPlaceholderText(/What is an AI agent/i);
    expect((textarea as HTMLTextAreaElement).value).toBe("What is an AI agent?");
  });

  it("should send message when form is submitted", async () => {
    const user = userEvent.setup();
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(
      /How do autonomous agents coordinate tasks/i
    );
    await user.type(textarea, "Test question");

    const sendButton = screen.getByLabelText("Send message");
    await user.click(sendButton);

    await waitFor(() => {
      expect(mockApi.sendMessage).toHaveBeenCalledWith(
        "Test question",
        "technical"
      );
    });
  });

  it("should display user message after sending", async () => {
    const user = userEvent.setup();
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(
      /How do autonomous agents coordinate tasks/i
    );
    await user.type(textarea, "My test question");

    const sendButton = screen.getByLabelText("Send message");
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("My test question")).toBeDefined();
    });
  });

  it("should display assistant response after sending", async () => {
    const user = userEvent.setup();
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(
      /How do autonomous agents coordinate tasks/i
    );
    await user.type(textarea, "My test question");

    const sendButton = screen.getByLabelText("Send message");
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Test response")).toBeDefined();
    });
  });

  it("should clear input after sending", async () => {
    const user = userEvent.setup();
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(
      /How do autonomous agents coordinate tasks/i
    ) as HTMLTextAreaElement;
    await user.type(textarea, "My test question");
    
    const sendButton = screen.getByLabelText("Send message");
    await user.click(sendButton);

    await waitFor(() => {
      expect(textarea.value).toBe("");
    });
  });

  it("should not send empty messages", async () => {
    const user = userEvent.setup();
    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const sendButton = screen.getByLabelText("Send message");
    await user.click(sendButton);

    expect(mockApi.sendMessage).not.toHaveBeenCalled();
  });

  it("should disable input while loading", async () => {
    const user = userEvent.setup();
    
    // Make sendMessage take a long time
    (mockApi.sendMessage as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({
        id: "response-1",
        role: "assistant",
        content: "Test response",
        timestamp: new Date(),
      }), 1000))
    );

    render(<ChatInterface mode="technical" onBack={mockOnBack} />);

    const textarea = screen.getByPlaceholderText(
      /How do autonomous agents coordinate tasks/i
    );
    await user.type(textarea, "Test question");

    const sendButton = screen.getByLabelText("Send message");
    await user.click(sendButton);

    // Check that textarea is disabled while loading
    await waitFor(() => {
      expect((textarea as HTMLTextAreaElement).disabled).toBe(true);
    });
  });
});
