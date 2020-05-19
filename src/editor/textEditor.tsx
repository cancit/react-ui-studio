import * as React from "react";
import { FieldEditor } from "./components/fieldEditor";
import {
  elementsState,
  activeElementState,
  activeElementIDState,
} from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { StyleJustifyContent } from "../types";
import _ from "lodash";

export function TextEditor() {
  const [elements, setElements] = useRecoilState(elementsState);
  const activeElement = useRecoilValue(activeElementState);
  const [activeElementId, setActiveElementId] = useRecoilState(
    activeElementIDState
  );
  return (
    <>
      <FieldEditor
        title="Name"
        field="name"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Text"
        field="text"
        type="text"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Text Color"
        field="props.style.color"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Font Size"
        field="props.style.fontSize"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Flex"
        field="props.style.flex"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Flex Direction"
        field="props.style.flexDirection"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Align Items"
        field="props.style.alignItems"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Justify Content"
        field="props.style.justifyContent"
        type="select"
        values={Object.keys(StyleJustifyContent)}
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Align Self"
        field="props.style.alignSelf"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Border Radius"
        field="props.style.borderRadius"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Background Color"
        field="props.style.backgroundColor"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Width"
        field="props.style.width"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />

      <FieldEditor
        title="Height"
        field="props.style.height"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="MarginLeft"
        field="props.style.marginLeft"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Margin Right"
        field="props.style.marginRight"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Margin Top"
        field="props.style.marginTop"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Margin Bottom"
        field="props.style.marginBottom"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <button
        style={{ alignSelf: "flex-start", marginTop: 24 }}
        onClick={() => {
          setElements((elements: any) => {
            const currentID = activeElement.id;
            const elems = _.cloneDeep(elements);
            const parent = Object.keys(elems).find((comp) => {
              return elems[comp].children?.indexOf(activeElement.id) > -1;
            })!;
            elems[parent] = {
              ...elems[parent],
              children: elems[parent].children.filter(
                (f: string) => f !== currentID
              ),
            };
            delete elems[currentID];
            setActiveElementId(parent);
            return elems;
          });
        }}
      >
        Delete Component
      </button>
      {
        <span style={{ marginTop: 24 }}>
          {JSON.stringify(activeElement, null, 4)}
        </span>
      }
    </>
  );
}
