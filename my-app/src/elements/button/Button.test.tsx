import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import { css } from "@emotion/react";

describe("Button Component", () => {
  it("renders the button with the correct text", () => {
    render(<Button text="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click Me" onClick={onClickMock} />);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("applies the provided styleClass", () => {
    const styleClass = css`
      background-color: red;
    `;
    render(<Button text="Styled Button" styleClass={styleClass} />);
    const buttonElement = screen.getByText("Styled Button");
    expect(buttonElement).toHaveStyle(`background-color: red`);
  });

  it("renders without crashing when no onClick is provided", () => {
    render(<Button text="No Click Handler" />);
    const buttonElement = screen.getByText("No Click Handler");
    fireEvent.click(buttonElement); // Should not throw an error
    expect(buttonElement).toBeInTheDocument();
  });
});
