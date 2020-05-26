import * as React from "react";
import { View, Text } from "react-native";
import { stringfyElements, flattenReactTree } from "./utils";
import { monaco, Monaco, ControlledEditor } from "@monaco-editor/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeElementState,
  elementsState,
  customComponentState,
} from "../../atoms";
import { StudioElement, StudioElementMap } from "../../types";
import * as ReactNative from "react-native";
import { parseTransformedCode, transformCode } from "./parser";
import { generateCode } from "./generator";

(window as any).React = React as any;
(window as any)["ReactNative"] = ReactNative;
// reactNative.render(react.createElement("div",{style:{color:"red"}},"Test"),document.getElementById("root"));
(window as any).View = ReactNative.View;
(window as any).Text = ReactNative.Text;
(window as any).TouchableOpacity = ReactNative.TouchableOpacity;

(window as any).exports = {};

export function Code() {
  const activeElement = useRecoilValue(activeElementState) as StudioElement;
  const [elements, setElements] = useRecoilState(elementsState) as [
    StudioElementMap,
    any
  ];
  const [customComponents, setCustomComponents] = useRecoilState(
    customComponentState
  );
  const editorRef = React.useRef<any>();
  React.useEffect(() => {
    if (editorRef.current && editorRef.current !== null) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  }, [activeElement]);
  const [code, setCode] = React.useState("");
  const [transformedCode, setTransformedCode] = React.useState("");

  return (
    <div style={{ flex: 1 }}>
      <button
        onClick={() => {
          const res = parseTransformedCode(transformedCode);
          setCustomComponents((comps: any) => {
            comps = {
              ...comps,
              [activeElement.id]: { func: res, code: code },
            };
            return comps;
          });
          setElements((elements: StudioElementMap) => {
            elements = {
              ...elements,
              [activeElement.id]: {
                ...elements[activeElement.id],
                custom: true,
              },
            };
            return elements;
          });
          // (window as any).Welcome = res;
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          editorRef.current.getAction("editor.action.formatDocument").run();
        }}
      >
        Format
      </button>
      <ControlledEditor
        height={"400px"}
        options={{
          formatOnType: true,
          fontSize: 14,
          lineNumbers: false,
          minimap: {
            enabled: false,
          },
          wrappingInfo: {
            isViewportWrapping: true,
            wrappingColumn: 80,
          },
          wordWrap: "on",
        }}
        editorDidMount={(getEditorVControlledEditoralue, editor) => {
          editorRef.current = editor;
          setTimeout(() => {
            editor.getAction("editor.action.formatDocument").run();
          }, 10);
        }}
        language="javascript"
        theme="dark"
        onChange={(e, value) => {
          const gen = transformCode(value || "");
          setCode(value || "");
          setTransformedCode(gen);
        }}
        value={
          customComponents[activeElement.id]
            ? customComponents[activeElement.id].code
            : generateCode({
                activeElementId: activeElement.id,
                elements,
                customComponents,
              }) /* `
import * as React from \"react\"
import { View, Text } from \"react-native\"

export default function () {

// Do not edit the content below this line
return (
      ${stringfyElements(activeElement, elements, {}).render})
}
` */
        }
      />
      <pre style={{ height: "400px", fontSize: 14, width: 300 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
