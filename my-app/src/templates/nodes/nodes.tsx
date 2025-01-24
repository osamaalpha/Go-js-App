import go from "gojs";
import { diagramHelper } from "../../helpers";

//This file utilizing all kind of Nodes we can use
//TODO: utilize shapes of Nodes and text styles as well

export const circleLinkingNodeTemplate = ($: typeof go.GraphObject.make) =>
  $(go.Node, "Auto", {
    locationSpot: go.Spot.Center,
    resizable: true,
    cursor: "grab",
    dragComputation: diagramHelper.avoidNodeOverlap,

    // Add context menu to the link
    contextMenu: $(go.Adornment, "Vertical").add(
      go.GraphObject.build("ContextMenuButton", {
        click: (_e: go.InputEvent, obj: go.ObjectData) =>
          diagramHelper.diagramContextMenu.handleContextMenuClick(
            _e,
            obj,
            "NODETEXT",
            diagramHelper.diagramContextMenu.textSizeMax
          ),
        "ButtonBorder.fill": "white",
        _buttonFillOver: "skyblue",
      }).add(new go.TextBlock("maximize size"))
    ),
  })
    .bindTwoWay("location", "location", go.Point.parse, go.Point.stringify)
    .add(
      new go.Shape("circle", {
        name: "SHAPE",
        portId: "",
        cursor: "pointer",
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        fromLinkable: true,
        toLinkable: true,
      }).bind("fill", "color"),
      new go.TextBlock({
        margin: 4,
        font: "8px sans-serif",
        name: "NODETEXT",
        stroke: "white",
      }).bind("text")
    );
