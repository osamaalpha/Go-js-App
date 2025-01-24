import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToolBar from "./ToolBar";
import go from "gojs";

// Mocking the gojs Diagram class and its methods
jest.mock("gojs", () => {
  const originalGoJS = jest.requireActual("gojs");
  return {
    ...originalGoJS,
    Diagram: jest.fn().mockImplementation(() => {
      return {
        commandHandler: {
          increaseZoom: jest.fn(),
          decreaseZoom: jest.fn(),
        },
      };
    }),
  };
});

// Mocking the NodeSelector component
jest.mock("../nodeSelector/NodeSelector", () => {
  return ({ diagram }: { diagram: go.Diagram }) => (
    <div data-testid="node-selector">NodeSelector for diagram</div>
  );
});

// Mocking the Button component
jest.mock("../../elements/button/Button", () => {
  return ({
    onClick,
    text,
    styleClass,
  }: {
    onClick: () => void;
    text: string;
    styleClass: string;
  }) => (
    <button data-testid={text} className={styleClass} onClick={onClick}>
      {text}
    </button>
  );
});

describe("ToolBar Component", () => {
  let mockDiagram: go.Diagram;

  beforeEach(() => {
    // Reset mockDiagram before each test
    mockDiagram = new go.Diagram();
    mockDiagram.commandHandler = {
      increaseZoom: jest.fn(),
      decreaseZoom: jest.fn(),
    } as any;
  });

  it("renders the NodeSelector component", () => {
    render(<ToolBar diagram={mockDiagram} />);
    // Ensure the NodeSelector component is rendered
    expect(screen.getByTestId("node-selector")).toBeInTheDocument();
  });

  it("renders zoom buttons with correct text", () => {
    render(<ToolBar diagram={mockDiagram} />);

    // Ensure that zoom buttons are rendered
    expect(screen.getByTestId("+")).toBeInTheDocument();
    expect(screen.getByTestId("-")).toBeInTheDocument();
  });

  it("calls zoomIn when '+' button is clicked", () => {
    render(<ToolBar diagram={mockDiagram} />);

    // Mock zoomIn function
    const zoomInButton = screen.getByTestId("+");
    fireEvent.click(zoomInButton);

    // Ensure that zoomIn was called
    expect(mockDiagram.commandHandler.increaseZoom).toHaveBeenCalled();
  });

  it("calls zoomOut when '-' button is clicked", () => {
    render(<ToolBar diagram={mockDiagram} />);

    // Mock zoomOut function
    const zoomOutButton = screen.getByTestId("-");
    fireEvent.click(zoomOutButton);

    // Ensure that zoomOut was called
    expect(mockDiagram.commandHandler.decreaseZoom).toHaveBeenCalled();
  });
});
