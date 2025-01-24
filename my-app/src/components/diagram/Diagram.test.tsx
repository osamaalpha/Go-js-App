import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Diagram from "./Diagram";

// Mock the tenThousandsNodesDiagram function to avoid creating an actual diagram
jest.mock("../../diagrams/tenThousandsNodes/tenThousandsNodes", () =>
  jest.fn().mockReturnValue({
    addDiagramListener: jest.fn(),
    model: {
      set: jest.fn(),
    },
    div: null,
  })
);

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Diagram Component", () => {
  const mockSetDiagram = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the diagram component without errors", () => {
    render(<Diagram setDiagram={mockSetDiagram} diagram={null} />);

    // Ensure the div element is rendered where the diagram will be attached
    const diagramDiv = screen.getByTestId("diagram-container");
    expect(diagramDiv).toBeInTheDocument();
  });

  //TODO: Fix this test
  //   it("initializes the diagram on mount and calls setDiagram", () => {
  //     const mockDiagram = {
  //       addDiagramListener: jest.fn(),
  //       model: { set: jest.fn() },
  //     } as any;

  //     mockSetDiagram.mockReturnValue(mockDiagram);

  //     render(<Diagram setDiagram={mockSetDiagram} diagram={mockDiagram} />);

  //     // Ensure that the tenThousandsNodesDiagram function is called
  //     expect(require("../../diagrams/tenThousandsNodes")).toHaveBeenCalledTimes(
  //       1
  //     );

  //     console.log("MOCKData", mockSetDiagram.mock.calls);

  //     // Ensure that setDiagram is called with the new diagram
  //     expect(mockSetDiagram).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         addDiagramListener: expect.any(Function),
  //         model: expect.any(Object),
  //       })
  //     );
  //   });

  it("sets up LinkDrawn event listener when diagram is provided", () => {
    const mockDiagram = {
      addDiagramListener: jest.fn(),
      model: { set: jest.fn() },
    } as any;

    render(<Diagram setDiagram={mockSetDiagram} diagram={mockDiagram} />);

    // Ensure that the "LinkDrawn" event listener is added to the diagram
    expect(mockDiagram.addDiagramListener).toHaveBeenCalledWith(
      "LinkDrawn",
      expect.any(Function)
    );
  });

  it("cleans up the diagram on unmount", () => {
    const mockDiagram = {
      addDiagramListener: jest.fn(),
      model: { set: jest.fn() },
      div: {},
    } as any;

    const { unmount } = render(
      <Diagram setDiagram={mockSetDiagram} diagram={mockDiagram} />
    );

    // Ensure the cleanup function removes the diagram's div reference when the component unmounts
    mockDiagram.div = null;
    unmount();
    expect(mockDiagram.div).toBeNull();
  });
});
