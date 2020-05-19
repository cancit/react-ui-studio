import * as React from "react";
import { elementsState } from "../atoms";
import { useRecoilState } from "recoil";
import { StudioElementMap, StudioElement } from "../types";
import { uuidv4 } from "../util";
export function CodeEditor() {
  const [code, setCode] = React.useState("");
  const [elements, setElements] = useRecoilState(elementsState);
  return (
    <div style={{ margin: 6 }}>
      <textarea
        onChange={(e) => {
          const text = e.target.value;
          const gen = (window as any).Babel.transform(text, {
            presets: ["es2015", "react"],
          }).code;
          setCode(gen);
        }}
        style={{ display: "flex" }}
      />
      <button
        onClick={() => {
          const refactorCode = code.replace(
            /React.createElement/g,
            "createElement"
          );
          let a =
            "function createElement(type,props,...children){ return({type:type+'',props:props,children})};";
          a += refactorCode;
          a += "(()=>{return(Welcome({name:'{{props.name}}'}))})()";
          console.log(refactorCode);
          const res = eval(a);
          console.log(res);
          const components = flattenReactTree(res, {}, "root");
          setElements(components.map);
        }}
      >
        Parse
      </button>
      <div>{code}</div>
    </div>
  );
}
function flattenReactTree(
  tree: { type: string; props: string; children: [] },
  map?: StudioElementMap,
  firstId?: string
) {
  if (!map) {
    map = {};
  }
  const obj = {
    id: firstId || uuidv4(),
    component: tree.type,
    props: tree.props,
    children: undefined,
  } as StudioElement;
  if (tree.children) {
    obj.children = tree.children.map((a: any) => {
      if (!a?.type) {
        if (a) {
          if (!obj.text) {
            obj.text = "";
          }
          obj.text += a;
        }
        return "-";
      }
      const res = flattenReactTree(a, map);
      return res.obj.id as string;
    });
    obj.children = obj.children.filter((f) => f !== "-");
    if (obj.children.length === 0) {
      delete obj.children;
    }
  }
  map[obj.id] = obj as any;
  return { map, obj };
}
