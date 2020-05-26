import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeElementIDState,
  elementsState,
  activeElementState,
  editorTabState,
} from "../atoms";
import _ from "lodash";
import { ViewEditor } from "./viewEditor";
import { TextEditor } from "./textEditor";
import { ImageEditor } from "./imageEditor";
import { StudioElement, StudioElementMap } from "../types";
import MonacoEditor, { monaco, Monaco } from "@monaco-editor/react";
import { Code } from "./code";
import { TouchableOpacityEditor } from "./touchableOpacity";

monaco
  .init()
  .then((monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      jsx: monaco.languages.typescript.JsxEmit.React,
    });
  })
  .catch((error) =>
    console.error("An error occurred during initialization of Monaco: ", error)
  );
export function Editor() {
  const [tab, setTab] = useRecoilState(editorTabState);
  const activeElement = useRecoilValue(activeElementState) as StudioElement;
  const [elements] = useRecoilState(elementsState) as [StudioElementMap];

  const editorRef = React.useRef<any>();
  React.useEffect(() => {
    if (tab === "code" && editorRef.current && editorRef.current !== null) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  }, [activeElement]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // height: 600,
        width: tab === "design" ? 280 : 600,
        flex: 1,
      }}
    >
      {tab === "design" && (
        <>
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
            {activeElement?.component === "TouchableOpacity" && (
              <TouchableOpacityEditor />
            )}
          </div>
        </>
      )}
      {tab === "code" && <Code />}
    </div>
  );
}
