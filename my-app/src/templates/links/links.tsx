import go from "gojs";
import { diagramHelper } from "../../helpers";

//This file utilizing all kind of links we can use
//TODO: utilize shapes of links and text styles as well

export const flexiableLinksTemplates = ($: typeof go.GraphObject.make) =>
  $(
    go.Link,
    $(go.Shape, { strokeWidth: 2 }),
    $(
      go.Panel,
      "Auto",
      $(
        go.Shape, // the label background, which becomes transparent around the edges
        {
          fill: $(go.Brush, "Radial", {
            0: "rgb(240, 240, 240)",
            0.3: "rgb(240, 240, 240)",
            1: "rgba(240, 240, 240, 0)",
          }),
          stroke: null,
        }
      ),
      $(
        go.TextBlock,
        {
          font: "6px sans-serif",
          margin: 5,
          name: "LINKTEXT",
        },
        new go.Binding("text")
      )
    ),
    {
      dragComputation: diagramHelper.avoidNodeOverlap,
      reshapable: true,
      resegmentable: true,
      relinkableFrom: true,
      relinkableTo: true,
      routing: go.Routing.AvoidsNodes,
    },
    {
      // Add context menu to the link
      contextMenu: $(go.Adornment, "Vertical").add(
        go.GraphObject.build("ContextMenuButton", {
          click: (_e: go.InputEvent, obj: go.ObjectData) =>
            diagramHelper.diagramContextMenu.handleContextMenuClick(
              _e,
              obj,
              "LINKTEXT",
              diagramHelper.diagramContextMenu.textSizeMin
            ),
          "ButtonBorder.fill": "white",
          _buttonFillOver: "skyblue",
        }).add(new go.TextBlock("minimize size"))
      ),
    },
    // remember the (potentially) user-modified route
    new go.Binding("points").makeTwoWay(),
    // remember any spots modified by LinkShiftingTool
    new go.Binding("fromSpot", "fromSpot", go.Spot.parse).makeTwoWay(
      go.Spot.stringify
    ),
    new go.Binding("toSpot", "toSpot", go.Spot.parse).makeTwoWay(
      go.Spot.stringify
    )
  );
