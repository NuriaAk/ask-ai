/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface WrapperProps {
  children: ReactNode;
}

const AllTheProviders = ({ children }: WrapperProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react
export * from "@testing-library/react";
// Override render with our custom render
export { customRender as render };
