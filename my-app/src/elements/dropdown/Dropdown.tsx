/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/serialize";
import { ChangeEvent } from "react";

interface SelectionNode {
  key: string;
  text: string;
}

interface DropdownProps {
  onChange: (event: ChangeEvent<Element>) => void;
  list: SelectionNode[];
  styleClass?: SerializedStyles;
}

const Dropdown = ({ onChange, list, styleClass }: DropdownProps) => {
  return (
    <select css={styleClass} onChange={onChange}>
      {list.map((node) => (
        <option key={node.key} value={node.key}>
          {node.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
