import { test, expect } from "@playwright/test";

test.describe("Chat Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should send a message and receive a response in non-technical mode", async ({
    page,
  }) => {
    await page.getByText("I'm Exploring AI").click();

    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await textarea.fill("What is an AI agent?");
    await page.getByLabel("Send message").click();

    // User message should appear
    await expect(page.getByText("What is an AI agent?")).toBeVisible();

    // Wait for and verify assistant response (non-technical)
    await expect(page.getByText(/digital assistant/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("should send a message and receive a response in technical mode", async ({
    page,
  }) => {
    await page.getByText("I Build with AI").click();

    const textarea = page.getByPlaceholder(
      /How do autonomous agents coordinate tasks/i
    );
    await textarea.fill("How do agents work?");
    await page.getByLabel("Send message").click();

    // User message should appear
    await expect(page.getByText("How do agents work?")).toBeVisible();

    // Wait for and verify assistant response (technical - contains architectural terms)
    await expect(page.getByText(/architectural|Perception Layer/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show loading state while waiting for response", async ({
    page,
  }) => {
    await page.getByText("I'm Exploring AI").click();

    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await textarea.fill("Test question");
    await page.getByLabel("Send message").click();

    // Should show thinking indicator
    await expect(page.getByText("Thinking...")).toBeVisible();
  });

  test("should clear input after sending message", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await textarea.fill("My question");
    await page.getByLabel("Send message").click();

    await expect(textarea).toHaveValue("");
  });

  test("should populate input when clicking suggestion", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    await page.getByRole("button", { name: "What is an AI agent?" }).click();

    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await expect(textarea).toHaveValue("What is an AI agent?");
  });

  test("should not send empty messages", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    // Click send without typing anything
    await page.getByLabel("Send message").click();

    // Empty state should still be visible
    await expect(page.getByText("No question is too simple")).toBeVisible();
  });

  test("should send message on Enter key", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await textarea.fill("Enter key test");
    await textarea.press("Enter");

    // Message should be sent
    await expect(page.getByText("Enter key test")).toBeVisible();
  });

  test("should not send on Shift+Enter (new line)", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await textarea.fill("Line 1");
    await textarea.press("Shift+Enter");

    // Empty state should still be visible (message not sent)
    await expect(page.getByText("No question is too simple")).toBeVisible();
  });

  test("should handle multiple messages in conversation", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    // First message
    const textarea = page.getByPlaceholder(/What is an AI agent/i);
    await textarea.fill("First question");
    await page.getByLabel("Send message").click();

    // Wait for first response
    await expect(page.getByText(/digital assistant/i)).toBeVisible({
      timeout: 5000,
    });

    // Second message
    await textarea.fill("Second question about coordination");
    await page.getByLabel("Send message").click();

    // Both user messages should be visible
    await expect(page.getByText("First question")).toBeVisible();
    await expect(
      page.getByText("Second question about coordination")
    ).toBeVisible();
  });

  test("should get coordination-specific response", async ({ page }) => {
    await page.getByText("I Build with AI").click();

    const textarea = page.getByPlaceholder(
      /How do autonomous agents coordinate tasks/i
    );
    await textarea.fill("How do agents coordinate together?");
    await page.getByLabel("Send message").click();

    // Should get coordination-specific response
    await expect(page.getByText(/Hierarchical|coordination/i)).toBeVisible({
      timeout: 5000,
    });
  });
});
