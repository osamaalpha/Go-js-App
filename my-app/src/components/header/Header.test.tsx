import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { Diagram } from "gojs";

// Mock the `Diagram` class
jest.mock("gojs", () => {
  const originalGoJS = jest.requireActual("gojs");
  return {
    ...originalGoJS,
    Diagram: jest.fn().mockImplementation(() => {
      // Return a mock Diagram object with necessary methods
      return {
        addModelChangedListener: jest.fn(),
        model: {
          raiseChangedEvent: jest.fn(),
        },
        isReadOnly: false,
        div: null, // Ensure no actual DOM element is being used
      };
    }),
  };
});

const callbackMock = jest.fn();

describe("Header Component", () => {
  let mockDiagram: Diagram;

  beforeEach(() => {
    mockDiagram = new Diagram();
    mockDiagram.isReadOnly = true;
    mockDiagram.div = null;
    jest.clearAllMocks();
  });

  it("renders the Button with initial 'Saved' state", () => {
    mockDiagram.addModelChangedListener = jest.fn((callback) => {
      callbackMock.mockImplementation(callback);
    }) as jest.Mock;
    render(<Header diagram={mockDiagram} />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("updates to 'Saving...' when the diagram changes", () => {
    mockDiagram.addModelChangedListener = jest.fn((callback) => {
      callbackMock.mockImplementation(callback);
    }) as any;

    render(<Header diagram={mockDiagram} />);

    act(() => {
      (mockDiagram.addModelChangedListener as jest.Mock).mock.calls[0][0]({
        isTransactionFinished: true,
      });
    });

    expect(screen.getByText("Saving...")).toBeInTheDocument();
  });

  it("returns to 'Saved' state after 5 seconds", () => {
    mockDiagram.addModelChangedListener = jest.fn((callback) => {
      callbackMock.mockImplementation(callback);
    }) as any;
    jest.useFakeTimers();

    render(<Header diagram={mockDiagram} />);

    act(() => {
      (mockDiagram.addModelChangedListener as jest.Mock).mock.calls[0][0]({
        isTransactionFinished: true,
      });
    });

    expect(screen.getByText("Saving...")).toBeInTheDocument();

    // Advance time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Saved")).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("does not crash if no diagram is provided", () => {
    render(<Header diagram={undefined as unknown as Diagram} />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });
});
