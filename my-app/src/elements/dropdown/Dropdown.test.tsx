import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "./Dropdown";
import { css } from "@emotion/react";

describe("Dropdown Component", () => {
  const mockList = [
    { key: "1", text: "Option 1" },
    { key: "2", text: "Option 2" },
    { key: "3", text: "Option 3" },
  ];

  it("renders all options from the list", () => {
    render(<Dropdown onChange={() => {}} list={mockList} />);
    mockList.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });

  it("calls onChange handler when an option is selected", () => {
    const onChangeMock = jest.fn();
    render(<Dropdown onChange={onChangeMock} list={mockList} />);
    const selectElement = screen.getByRole("combobox");

    // Simulate selecting an option
    fireEvent.change(selectElement, { target: { value: mockList[1].key } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("applies the provided styleClass", () => {
    const styleClass = css`
      background-color: blue;
    `;
    render(
      <Dropdown onChange={() => {}} list={mockList} styleClass={styleClass} />
    );
    const dropdownElement = screen.getByRole("combobox");
    expect(dropdownElement).toHaveStyle(`background-color: blue`);
  });

  it("renders without crashing when the list is empty", () => {
    render(<Dropdown onChange={() => {}} list={[]} />);
    const dropdownElement = screen.getByRole("combobox");
    expect(dropdownElement).toBeInTheDocument();
    expect(dropdownElement.children).toHaveLength(0); // No options rendered
  });
});
