import go from "gojs";
import { handleContextMenuClick, textSizeMax } from "./diagramContextMenu";

jest.mock("gojs", () => {
  const originalGoJS = jest.requireActual("gojs");
  return {
    ...originalGoJS,
    InputEvent: jest.fn(),
    ObjectData: jest.fn(),
    Spot: {
      AllSides: "AllSides",
      Center: "Center",
      parse: jest.fn(),
      stringify: jest.fn(),
    },
    Shape: jest.fn(),
    TextBlock: jest.fn(),
    Adornment: jest.fn(),
    GraphObject: {
      make: jest.fn().mockImplementation(() => ({
        locationSpot: "Center",
        resizable: true,
      })),
    },
  };
});

describe("handleContextMenuClick", () => {
  it("should double the font size of the node text", () => {
    const mockTarget = {
      findObject: jest.fn().mockReturnValue({
        font: "12px sans-serif",
      }),
    };

    const mockEvent = {} as go.InputEvent;
    const mockObj = {
      part: { adornedPart: mockTarget },
    } as unknown as go.ObjectData;

    handleContextMenuClick(mockEvent, mockObj, "NODETEXT", textSizeMax);

    expect(mockTarget.findObject).toHaveBeenCalledWith("NODETEXT");
    expect(mockTarget.findObject().font).toBe("24px sans-serif"); // Font size doubled
  });

  it("should not throw an error if no part is found", () => {
    const mockEvent = {} as go.InputEvent;
    const mockObj = { part: null } as unknown as go.ObjectData;

    expect(() =>
      handleContextMenuClick(mockEvent, mockObj, "NODETEXT", textSizeMax)
    ).not.toThrow();
  });
});
