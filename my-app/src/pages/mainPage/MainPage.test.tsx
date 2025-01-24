import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "./MainPage";
import go from "gojs";

// Mocking Diagram, Header, and ToolBar components
jest.mock("../../components/diagram/Diagram", () => {
  return ({
    setDiagram,
  }: {
    setDiagram: React.Dispatch<React.SetStateAction<go.Diagram | null>>;
  }) => (
    <button onClick={() => setDiagram({} as go.Diagram)}>Set Diagram</button>
  );
});

jest.mock("../../components/header/Header", () => {
  return ({ diagram }: { diagram: go.Diagram }) => (
    <div data-testid="header">Header </div>
  );
});

jest.mock("../../components/toolBar/ToolBar", () => {
  return ({ diagram }: { diagram: go.Diagram }) => (
    <div data-testid="toolbar">ToolBar </div>
  );
});

describe("MainPage Component", () => {
  it("renders the page with Diagram and without Header and ToolBar initially", () => {
    render(<MainPage />);

    // Initially, we only expect the Diagram button to be rendered
    expect(screen.getByText("Set Diagram")).toBeInTheDocument();
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("toolbar")).not.toBeInTheDocument();
  });

  it("renders Header and ToolBar when diagram state is set", () => {
    render(<MainPage />);

    // Simulate setting the diagram by clicking the button in the Diagram mock
    fireEvent.click(screen.getByText("Set Diagram"));

    // After clicking, we expect Header and ToolBar to be rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("toolbar")).toBeInTheDocument();
  });

  it("does not render Header and ToolBar when diagram is null", () => {
    render(<MainPage />);

    // We don't set the diagram, so Header and ToolBar should not be rendered
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("toolbar")).not.toBeInTheDocument();
  });
});
