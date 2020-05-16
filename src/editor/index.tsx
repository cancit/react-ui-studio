import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeElementIDState,
  elementsState,
  activeElementState,
} from "../atoms";
import _ from "lodash";
import { ViewEditor } from "./viewEditor";
import { TextEditor } from "./textEditor";
import { ImageEditor } from "./imageEditor";
export function Editor() {
  const activeElement = useRecoilValue(activeElementState);

  return (
    <div style={{ padding: 12, display: "flex", flexDirection: "column" }}>
      <span style={{ marginBottom: 4 }}>Editor</span>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "white",
          opacity: 0.4,
          marginBottom: 12,
        }}
      />

      {activeElement?.component === "View" && <ViewEditor />}
      {activeElement?.component === "Text" && <TextEditor />}
      {activeElement?.component === "Image" && <ImageEditor />}
    </div>
  );
}
