import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ExperienceSelector from "@/components/ExperienceSelector";

// Wrap components for routing if needed
const renderExperienceSelector = (onSelect: (mode: "technical" | "non-technical") => void) => {
  return render(<ExperienceSelector onSelect={onSelect} />);
};

describe("ExperienceSelector", () => {
  it("should render both experience options", () => {
    const onSelect = vi.fn();
    renderExperienceSelector(onSelect);

    expect(screen.getByText("I'm Exploring AI")).toBeDefined();
    expect(screen.getByText("I Build with AI")).toBeDefined();
  });

  it("should call onSelect with 'non-technical' when exploring option is clicked", () => {
    const onSelect = vi.fn();
    renderExperienceSelector(onSelect);

    const exploringButton = screen.getByText("I'm Exploring AI").closest("button");
    fireEvent.click(exploringButton!);

    expect(onSelect).toHaveBeenCalledWith("non-technical");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("should call onSelect with 'technical' when building option is clicked", () => {
    const onSelect = vi.fn();
    renderExperienceSelector(onSelect);

    const technicalButton = screen.getByText("I Build with AI").closest("button");
    fireEvent.click(technicalButton!);

    expect(onSelect).toHaveBeenCalledWith("technical");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("should display descriptive text for non-technical option", () => {
    const onSelect = vi.fn();
    renderExperienceSelector(onSelect);

    expect(screen.getByText(/New to AI agents\? No worries!/i)).toBeDefined();
  });

  it("should display descriptive text for technical option", () => {
    const onSelect = vi.fn();
    renderExperienceSelector(onSelect);

    expect(screen.getByText(/Looking for technical depth\?/i)).toBeDefined();
  });

  it("should display no login required message", () => {
    const onSelect = vi.fn();
    renderExperienceSelector(onSelect);

    expect(screen.getByText(/No login required/i)).toBeDefined();
  });
});
