import go from "gojs";
import { RefObject } from "react";
import {
  circleLinkingNodeTemplate,
  flexiableLinksTemplates,
} from "../../templates";
import { diagramHelper } from "../../helpers";

const tenThousandsNodesDiagram = (
  diagramRef: RefObject<HTMLDivElement | null>
) => {
  if (!diagramRef) return null;
  const $ = go.GraphObject.make;

  const diagram = $(
    go.Diagram,
    (diagramRef as RefObject<HTMLDivElement>).current,
    {
      initialContentAlignment: go.Spot.Center,
      layout: $(go.TreeLayout),
      "undoManager.isEnabled": true,
    }
  );

  diagram.nodeTemplate = circleLinkingNodeTemplate($);
  diagram.linkTemplate = flexiableLinksTemplates($);

  diagram.model = new go.GraphLinksModel(
    diagramHelper.diagramElementsData.createDiagramElementsData(
      diagramHelper.diagramElementsData.nodeElementType,
      10000
    ),
    diagramHelper.diagramElementsData.createDiagramElementsData(
      diagramHelper.diagramElementsData.LinkElementType,
      5000
    )
  );

  return diagram;
};

export default tenThousandsNodesDiagram;
