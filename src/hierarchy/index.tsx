import * as React from "react";
import { useRecoilState } from "recoil";
import { elementsState, activeElementIDState } from "../atoms";
import { StudioElementMap } from "../types";
import { TouchableOpacity, Text } from "react-native";
export function Hierarchy() {
  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  return (
    <div style={{ padding: 8, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <span style={{ marginBottom: 4, flex: 1 }}>Hierarchy</span>
        <button
          onClick={() => {
            const saved = JSON.parse(
              window.localStorage.getItem("savedElements") || ""
            );
            setElements(saved);
          }}
        >
          load
        </button>
        <button
          onClick={() => {
            window.localStorage.setItem(
              "savedElements",
              JSON.stringify(elements)
            );

            alert("Saved");
          }}
        >
          save
        </button>
      </div>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "white",
          opacity: 0.4,
          marginBottom: 12,
        }}
      />
      <RowElement
        key={"root"}
        level={0}
        elementId={"root"}
        activeElementId={activeElementId}
        setActiveElementID={setActiveElementID}
        elements={elements}
      />
    </div>
  );
}
function RowElement(props: {
  level: number;
  elementId: string;
  activeElementId: string;
  setActiveElementID: (a: string) => void;
  elements: StudioElementMap;
}) {
  const e = props.elements[props.elementId];
  console.log("rowElement", props.elementId);
  return (
    <div key={e.id} style={{ paddingLeft: props.level > 0 ? 12 : 0 }}>
      <div
        style={
          props.activeElementId === e.id
            ? {
                borderWidth: 1,
                borderColor: "white",
                borderStyle: "dashed",
                padding: 5,
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }
            : {
                padding: 6,
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }
        }
        onClick={() => {
          props.setActiveElementID(e.id);
        }}
      >
        <span className="material-icons">chevron_right</span>
        <span style={{ fontSize: 14 }}>{e.name || e.component}</span>{" "}
      </div>
      {e.children &&
        e.children.map((a) => (
          <RowElement
            key={a}
            level={props.level + 1}
            elementId={a}
            activeElementId={props.activeElementId}
            setActiveElementID={props.setActiveElementID}
            elements={props.elements}
          />
        ))}
    </div>
  );
}
