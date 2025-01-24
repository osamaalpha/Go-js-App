import { css } from "@emotion/react";

export const savingButton = (isSaving: boolean) =>
  css({
    padding: isSaving ? "14px" : "10px",
    margin: "20px",
    color: isSaving ? "black" : "white",
    backgroundColor: "#EA4C89",
    border: "1px solid transparent",
    borderRadius: "8px",
    fontSize: isSaving ? "14px" : "12px",
  });
