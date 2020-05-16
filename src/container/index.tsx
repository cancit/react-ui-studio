import * as React from "react";
import { Device } from "./device";
import { uuidv4 } from "../util";
import { useRecoilState } from "recoil";
import {
  activeElementIDState,
  elementsState,
  elementsHierarchyState,
} from "../atoms";
import _ from "lodash";
import { StudioElement, StudioHierarchy, StudioElementMap } from "../types";
export function Container() {
  const [hierarchy, setHierarchy] = useRecoilState(elementsHierarchyState);

  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  const addElement = (newElement: StudioElement) => {
    setElements((elements: StudioElementMap) => {
      const elems = _.cloneDeep(elements);
      if (!elems[activeElementId].children) {
        elems[activeElementId].children = [newElement.id];
      } else {
        elems[activeElementId].children!.push(newElement.id);
      }
      elems[newElement.id] = newElement;
      console.log("elements", elems);
      return elems;
    });
    setHierarchy((hierarchy: StudioHierarchy[]) => {
      let elems = _.cloneDeep(hierarchy).map((a: any) => {
        if (a.id === activeElementId) {
          if (!a.children) {
            a.children = [];
          }
          a.children.push(newElement.id);
        }
        return a;
      });
      console.log("hierarchy", elems);
      return elems;
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#282c34",
          display: "flex",
          paddingLeft: 8,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            const newElement = {
              component: "View",
              id: uuidv4(),
              style: { height: 100, width: 100, backgroundColor: "gray" },
            } as StudioElement;
            addElement(newElement);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
          }}
        >
          + View
        </button>
        <button
          onClick={() => {
            const newElement = {
              component: "Text",
              id: uuidv4(),
              text: "Text",
              style: {},
            } as StudioElement;
            addElement(newElement);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          + Text
        </button>
        <button
          onClick={() => {
            const newElement = {
              component: "Image",
              id: uuidv4(),
              text: "Text",
              style: {},
            } as StudioElement;
            addElement(newElement);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          + Image
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "scroll",
          justifyContent: "center",
          backgroundColor: "#424e5059",
          paddingTop: 48,
          flex: 1,
        }}
      >
        <Device />
      </div>
    </div>
  );
}
