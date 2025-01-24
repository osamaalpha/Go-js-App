/** @jsxImportSource @emotion/react */
import { NodeSelector } from "../nodeSelector";
import { nodeSelection, toolBarContainer, zoomButton } from "./style";
import { Button } from "../../elements";
import { selectNodeText } from "../../constants";

interface ToolBarProps {
  diagram: go.Diagram;
}

const ToolBar = ({ diagram }: ToolBarProps) => {
  const zoomIn = () => {
    diagram.commandHandler.increaseZoom();
  };

  const zoomOut = () => {
    diagram.commandHandler.decreaseZoom();
  };

  return (
    <div css={toolBarContainer}>
      <div css={nodeSelection}>
        <p>{selectNodeText}</p>
        <NodeSelector diagram={diagram} />
      </div>
      <div>
        <Button styleClass={zoomButton} onClick={zoomIn} text={"+"} />
        <Button styleClass={zoomButton} onClick={zoomOut} text={"-"} />
      </div>
    </div>
  );
};

export default ToolBar;
