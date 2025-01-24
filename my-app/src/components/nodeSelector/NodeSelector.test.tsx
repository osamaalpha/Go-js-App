import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NodeSelector from "./NodeSelector";
import go from "gojs";

// Mock the GoJS Diagram class and its methods
jest.mock("gojs", () => {
  const originalGoJS = jest.requireActual("gojs");
  return {
    ...originalGoJS,
    Diagram: jest.fn().mockImplementation(() => {
      return {
        findNodeForKey: jest.fn(),
        scale: 1,
      };
    }),
  };
});

// Mock the Dropdown component
jest.mock("../../elements/dropdown/Dropdown", () => {
  return ({ onChange, list }: { onChange: Function; list: any[] }) => (
    <select data-testid="dropdown" onChange={(e) => onChange(e)}>
      {list.map((item) => (
        <option key={item.key} value={item.key}>
          {item.text}
        </option>
      ))}
    </select>
  );
});

describe("NodeSelector Component", () => {
  let mockDiagram: go.Diagram;

  beforeEach(() => {
    mockDiagram = new go.Diagram();

    mockDiagram.model = {
      nodeDataArray: [
        { key: 1, text: "Node 1" },
        { key: 2, text: "Node 2" },
      ],
    } as any;
    mockDiagram.select = jest.fn();
    mockDiagram.clearSelection = jest.fn();
    mockDiagram.centerRect = jest.fn();
  });

  it("renders the dropdown with node options from the diagram", () => {
    render(<NodeSelector diagram={mockDiagram} />);

    // Ensure the dropdown has the correct options
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.children.length).toBe(2);
    expect(dropdown.children[0]).toHaveTextContent("Node 1");
    expect(dropdown.children[1]).toHaveTextContent("Node 2");
  });

  it("handles node selection and updates the diagram correctly", () => {
    const mockFindNodeForKey = jest.fn().mockReturnValue({
      actualBounds: {},
    });
    mockDiagram.findNodeForKey = mockFindNodeForKey;

    render(<NodeSelector diagram={mockDiagram} />);

    // Simulate selecting a node from the dropdown
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { value: "1" } });

    // Verify diagram interactions
    expect(mockDiagram.clearSelection).toHaveBeenCalled();
    expect(mockFindNodeForKey).toHaveBeenCalledWith(1);
    expect(mockDiagram.select).toHaveBeenCalled();
    expect(mockDiagram.centerRect).toHaveBeenCalled();
    expect(mockDiagram.scale).toBe(2);
  });

  it("does nothing if the selected node is not found", () => {
    mockDiagram.findNodeForKey = jest.fn().mockReturnValue(null);

    render(<NodeSelector diagram={mockDiagram} />);

    // Simulate selecting a node from the dropdown
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { value: "3" } });

    // Verify no interactions with undefined node
    expect(mockDiagram.clearSelection).toHaveBeenCalled();
    expect(mockDiagram.select).not.toHaveBeenCalled();
    expect(mockDiagram.centerRect).not.toHaveBeenCalled();
  });

  it("renders without crashing when no diagram is provided", () => {
    render(<NodeSelector diagram={undefined as unknown as go.Diagram} />);

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.children.length).toBe(0); // No nodes to display
  });
});
