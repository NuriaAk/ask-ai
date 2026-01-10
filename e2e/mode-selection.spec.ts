import { test, expect } from "@playwright/test";

test.describe("Mode Selection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display homepage with mode selection", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Ask Anything About AI Agents/i })
    ).toBeVisible();
    await expect(page.getByText("I'm Exploring AI")).toBeVisible();
    await expect(page.getByText("I Build with AI")).toBeVisible();
  });

  test("should navigate to chat in non-technical mode", async ({ page }) => {
    await page.getByText("I'm Exploring AI").click();

    await expect(page.getByText("Explorer Mode")).toBeVisible();
    await expect(
      page.getByText("Simple, friendly explanations")
    ).toBeVisible();
    await expect(
      page.getByPlaceholder(/What is an AI agent/i)
    ).toBeVisible();
  });

  test("should navigate to chat in technical mode", async ({ page }) => {
    await page.getByText("I Build with AI").click();

    await expect(page.getByText("Technical Mode")).toBeVisible();
    await expect(
      page.getByText("Detailed answers with code examples")
    ).toBeVisible();
    await expect(
      page.getByPlaceholder(/How do autonomous agents coordinate tasks/i)
    ).toBeVisible();
  });

  test("should return to mode selection when back is clicked", async ({
    page,
  }) => {
    await page.getByText("I'm Exploring AI").click();
    await expect(page.getByText("Explorer Mode")).toBeVisible();

    await page.getByLabel("Go back").click();

    await expect(page.getByText("I'm Exploring AI")).toBeVisible();
    await expect(page.getByText("I Build with AI")).toBeVisible();
  });

  test("should switch modes via switch mode button", async ({ page }) => {
    await page.getByText("I Build with AI").click();
    await expect(page.getByText("Technical Mode")).toBeVisible();

    await page.getByText("Switch mode").click();

    await expect(page.getByText("I'm Exploring AI")).toBeVisible();
  });

  test("should display different suggested questions per mode", async ({
    page,
  }) => {
    // Check non-technical suggestions
    await page.getByText("I'm Exploring AI").click();
    await expect(page.getByText("What is an AI agent?")).toBeVisible();
    await expect(
      page.getByText("How are agents different from chatbots?")
    ).toBeVisible();

    // Go back and switch to technical
    await page.getByLabel("Go back").click();
    await page.getByText("I Build with AI").click();

    await expect(page.getByText("How do agents use tools?")).toBeVisible();
    await expect(
      page.getByText("Multi-agent coordination patterns")
    ).toBeVisible();
  });
});
