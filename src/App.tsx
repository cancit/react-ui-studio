import React from "react";
import "./App.css";
import { Container } from "./container";
import { Editor } from "./editor";
import { Hierarchy } from "./hierarchy";
import { RecoilRoot } from "recoil";
import { CodeEditor } from "./code";
import { TopBar } from "./topBar";
import { colors } from "./constants/colors";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{
          background: colors.background,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxHeight: "100vh",
          flex: 1,
        }}
      >
        <TopBar />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "calc(100vh - 40px)",
            maxHeight: "calc(100vh - 40px)",
          }}
        >
          <div
            style={{
              width: 250,
              height: "100%",
              display: "flex",
              backgroundColor: colors.background,
              flexDirection: "column",
            }}
          >
            <Hierarchy />
            {<CodeEditor />}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "relative",
            }}
          >
            <Container />
          </div>
          <div
            style={{
              backgroundColor: colors.background,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "scroll",
            }}
          >
            <Editor />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
