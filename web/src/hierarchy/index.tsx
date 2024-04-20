import * as React from "react";
import { useRecoilState } from "recoil";
import { elementsState, activeElementIDState } from "../atoms";
import { StudioElementMap } from "../types";

export function Hierarchy() {
  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  return (
    <div style={{ padding: 8, display: "flex", flexDirection: "column" }}>
      {/* <div style={{ display: "flex", flexDirection: "row" }}>
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
      */}
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
        index={0}
        elementId={"root"}
        activeElementId={activeElementId}
        setActiveElementID={setActiveElementID}
        elements={elements}
        setElements={setElements}
      />
    </div>
  );
}
function RowElement(props: {
  level: number;
  elementId: string;
  activeElementId: string;
  parentId?: string;
  index: number;
  setActiveElementID: (a: string) => void;
  elements: StudioElementMap;
  setElements: (elements: any) => void;
}) {
  const e = props.elements[props.elementId];
  console.log("rowElement", props.elementId);
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <>
      <div key={e.id} style={{ paddingLeft: props.level * 12 }}>
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
          {e.children?.length ? (
            <span
              onClick={() => {
                setCollapsed((collapsed) => !collapsed);
              }}
              style={collapsed ? { transform: "rotate(90deg)" } : {}}
              className="material-icons"
            >
              chevron_right
            </span>
          ) : (
            <span
              onClick={() => {
                setCollapsed((collapsed) => !collapsed);
              }}
              style={{ visibility: "hidden" }}
              className="material-icons"
            >
              chevron_right
            </span>
          )}
          <span style={{ fontSize: 14, flex: 1 }}>{e.name || e.component}</span>{" "}
          {props.parentId && props.activeElementId === e.id && (
            <>
              <span
                onClick={() => {
                  props.setElements((elements: StudioElementMap) => {
                    const newOrder = reorder(
                      elements[props.parentId!].children,
                      props.index,
                      props.index - 1
                    );
                    return {
                      ...elements,
                      [props.parentId!]: {
                        ...elements[props.parentId!],
                        children: newOrder,
                      },
                    };
                  });
                }}
                style={{ fontSize: 14 }}
                className="material-icons"
              >
                arrow_upward
              </span>
              <span
                onClick={() => {
                  props.setElements((elements: StudioElementMap) => {
                    const newOrder = reorder(
                      elements[props.parentId!].children,
                      props.index,
                      props.index + 1
                    );
                    return {
                      ...elements,
                      [props.parentId!]: {
                        ...elements[props.parentId!],
                        children: newOrder,
                      },
                    };
                  });
                }}
                style={{ fontSize: 14, marginLeft: 4 }}
                className="material-icons"
              >
                arrow_downward
              </span>
            </>
          )}
        </div>
      </div>
      {!collapsed &&
        e.children &&
        e.children.map((a, index) => (
          <RowElement
            {...props}
            key={a}
            index={index}
            parentId={props.elementId}
            level={props.level + 1}
            elementId={a}
          />
        ))}
    </>
  );
}
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
