// This file handles clicking on the context menu for the diagram
export const textSizeMax = "DOUBLE";
export const textSizeMin = "BY-TWO";

export const handleContextMenuClick = (
  _e: go.InputEvent,
  obj: go.ObjectData,
  textBlockName: string,
  textOperation: string
) => {
  if (obj.part) {
    const target = obj.part.adornedPart; // Get the node the menu was opened for
    const targetTextFont = target.findObject(textBlockName).font;

    // This variable is getting the fontSize value of the text as a number
    const currentFontSize = Number(
      targetTextFont.substring(0, targetTextFont.indexOf("px"))
    );

    if (currentFontSize < 2) return;

    const newFontSize =
      textOperation === textSizeMax ? currentFontSize * 2 : currentFontSize / 2;

    target.findObject(textBlockName).font = `${newFontSize}px sans-serif`;
  }
};
