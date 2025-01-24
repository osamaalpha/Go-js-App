import { getRandomColor } from "../../getRandomColors";

// This file handles creating diagram elements (Nodes and Links) data
export const nodeObject = (i: number) => {
  return {
    key: i,
    text: `Node ${i}`,
    color: getRandomColor(),
  };
};

export const linkObject = (i: number) => {
  return {
    from: 2 * i,
    to: (2 * i + 1) % 10000,
    text: `Link ${2 * i} - ${(2 * i + 1) % 10000}`,
  };
};

export const nodeElementType = "NODE";
export const LinkElementType = "LINK";

export const createDiagramElementsData = (
  elementType: string,
  numberOfElements: number
) => {
  const elementsDataArray = [];
  const elementObject =
    elementType === nodeElementType ? nodeObject : linkObject;

  for (let i = 0; i < numberOfElements; i++) {
    elementsDataArray.push(elementObject(i));
  }

  return elementsDataArray;
};
