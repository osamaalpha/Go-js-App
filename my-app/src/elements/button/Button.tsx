/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/serialize";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  styleClass?: SerializedStyles;
}

const Button = ({ onClick, text, styleClass }: ButtonProps) => {
  return (
    <button css={styleClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
