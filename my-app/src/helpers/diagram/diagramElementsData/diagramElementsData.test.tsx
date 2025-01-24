import {
  createDiagramElementsData,
  LinkElementType,
  nodeElementType,
} from "./diagramElementsData";

// Mock getRandomColor
jest.mock("../../getRandomColors", () => ({
  getRandomColor: () => "#123456",
}));

describe("Diagram Elements Utils", () => {
  describe("nodeObject", () => {
    it("should return a node object with key, text, and color", () => {
      const node = createDiagramElementsData(nodeElementType, 1)[0];

      expect(node).toEqual({
        key: 0,
        text: "Node 0",
        color: "#123456", // Mocked color
      });
    });
  });

  describe("linkObject", () => {
    it("should return a link object with from, to, and text", () => {
      const link = createDiagramElementsData(LinkElementType, 1)[0];
      expect(link).toEqual({
        from: 0,
        to: 1,
        text: "Link 0 - 1",
      });
    });
  });

  describe("createDiagramElementsData", () => {
    it("should create an array with the correct number of elements for NODE type", () => {
      const nodes = createDiagramElementsData(nodeElementType, 5);
      expect(nodes).toHaveLength(5);
      expect(nodes[0]).toEqual({
        key: 0,
        text: "Node 0",
        color: "#123456",
      });
      expect(nodes[4]).toEqual({
        key: 4,
        text: "Node 4",
        color: "#123456",
      });
    });

    it("should create an array with the correct number of elements for LINK type", () => {
      const links = createDiagramElementsData(LinkElementType, 5);
      expect(links).toHaveLength(5);
      expect(links[0]).toEqual({
        from: 0,
        to: 1,
        text: "Link 0 - 1",
      });
      expect(links[4]).toEqual({
        from: 8,
        to: 9,
        text: "Link 8 - 9",
      });
    });

    it("should call nodeObject for NODE type", async () => {
      const nodeSpy = jest.spyOn(
        require("./diagramElementsData"),
        "nodeObject"
      );
      createDiagramElementsData(nodeElementType, 3);
      setTimeout(() => {
        expect(nodeSpy).toHaveBeenCalledTimes(3);
      }, 1);
    });

    it("should call linkObject for LINK type", async () => {
      const linkSpy = jest.spyOn(
        require("./diagramElementsData"),
        "linkObject"
      );
      createDiagramElementsData(LinkElementType, 3);
      setTimeout(() => {
        expect(linkSpy).toHaveBeenCalledTimes(3);
      }, 1);
    });
  });
});
