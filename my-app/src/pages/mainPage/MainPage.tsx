/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { mainPage } from "./style";
import { Diagram, Header, ToolBar } from "../../components";

const MainPage = () => {
  const [diagram, setDiagram] = useState<go.Diagram | null>(null);

  return (
    <div css={mainPage}>
      {diagram && <Header diagram={diagram} />}
      <Diagram setDiagram={setDiagram} diagram={diagram} />
      {diagram && <ToolBar diagram={diagram} />}
    </div>
  );
};

export default MainPage;
