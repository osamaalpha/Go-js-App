import { useState, useEffect, ChangeEvent } from "react";
import { Dropdown } from "../../elements";

interface NodeSelectorProps {
  diagram: go.Diagram;
}

type NodeSelectorObject = {
  key: string;
  text: string;
};

const NodeSelector = ({ diagram }: NodeSelectorProps) => {
  const [nodeList, setNodeList] = useState<NodeSelectorObject[]>([]);

  useEffect(() => {
    if (diagram) {
      const nodes = diagram.model.nodeDataArray.map((node) => ({
        key: node.key,
        text: node.text,
      }));
      setNodeList(nodes);
    }
  }, [diagram]);

  const handleNodeSelection = (event: ChangeEvent<Element>) => {
    const selectedNodeKey = (event.target as HTMLInputElement).value;

    diagram.clearSelection();

    const node = diagram.findNodeForKey(Number(selectedNodeKey));

    if (node) {
      diagram.select(node);
      diagram.centerRect(node.actualBounds);
      diagram.scale = 2;
    }
  };

  return (
    <div>
      <Dropdown onChange={handleNodeSelection} list={nodeList} />
    </div>
  );
};

export default NodeSelector;
