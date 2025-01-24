import { css } from "@emotion/react";

export const toolBarContainer = css({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
  alignItems: "center",
});

export const nodeSelection = css({
  p: {
    margin: "4px",
  },
});

export const zoomButton = css({
  backgroundColor: "rgb(229, 231, 232)",
  padding: "10px",
  margin: "8px",
  border: "1px solid transparent",
  borderRadius: "5px",
  cursor: "pointer",

  ":hover": {
    backgroundColor: "#FBCEB1",
  },
});
