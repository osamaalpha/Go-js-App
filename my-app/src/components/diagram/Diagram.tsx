import go from "gojs";
import React, { useEffect, useRef } from "react";
import { tenThousandsNodesDiagram } from "../../diagrams";

interface DiagramProps {
  setDiagram: React.Dispatch<React.SetStateAction<go.Diagram | null>>;
  diagram: go.Diagram | null;
}

const Diagram = ({ setDiagram, diagram }: DiagramProps) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent useEffect running twice if there is a diagram attached to the div element already
    if (diagramRef?.current?.children[0]) return;

    const newDiagram = tenThousandsNodesDiagram(diagramRef);

    setDiagram(newDiagram);

    return () => {
      if (newDiagram) newDiagram.div = null;
    };
  }, []);

  useEffect(() => {
    if (!diagram) return;
    
    // Add label to new links created
    diagram.addDiagramListener("LinkDrawn", function (e: go.DiagramEvent) {
      diagram.model.set(
        e.subject.data,
        "text",
        `Link ${e.subject.data.from} - ${e.subject.data.to}`
      );
    });
  }, [diagram]);

  return (
    <div
      data-testid="diagram-container"
      ref={diagramRef}
      style={{ width: "100%", height: "600px" }}
    ></div>
  );
};

export default Diagram;
