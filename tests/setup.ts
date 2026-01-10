import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";

// Mock crypto.randomUUID for tests
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => `test-uuid-${Math.random().toString(36).substr(2, 9)}`,
  },
});

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
