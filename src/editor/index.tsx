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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // height: 600,
        flex: 1,
      }}
    >
      <span style={{ marginBottom: 4, marginLeft: 12, marginTop: 10 }}>
        Editor
      </span>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "white",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          /*  height: "100%",
          maxHeight: "100vh", */
          overflowY: "auto",
          /*          alignSelf: "stretch",
          alignItems: "stretch", */
          padding: 12,
        }}
      >
        {activeElement?.component === "View" && <ViewEditor />}
        {activeElement?.component === "Text" && <TextEditor />}
        {activeElement?.component === "Image" && <ImageEditor />}
      </div>
    </div>
  );
}
