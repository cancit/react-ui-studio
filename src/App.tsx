import React from "react";
import "./App.css";
import { Container } from "./container";
import { Editor } from "./editor";
import { Hierarchy } from "./hierarchy";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{
          background: "#282c34",
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          flex: 1,
        }}
      >
        <div style={{ width: 300, backgroundColor: "#282c34" }}>
          <Hierarchy />
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
        <div style={{ width: 300, backgroundColor: "#282c34" }}>
          <Editor />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
