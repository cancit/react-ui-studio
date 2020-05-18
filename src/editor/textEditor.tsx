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
        field="style.color"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Font Size"
        field="style.fontSize"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Flex"
        field="style.flex"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Flex Direction"
        field="style.flexDirection"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Align Items"
        field="style.alignItems"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Justify Content"
        field="style.justifyContent"
        type="select"
        values={Object.keys(StyleJustifyContent)}
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Align Self"
        field="style.alignSelf"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Border Radius"
        field="style.borderRadius"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Background Color"
        field="style.backgroundColor"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Width"
        field="style.width"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />

      <FieldEditor
        title="Height"
        field="style.height"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="MarginLeft"
        field="style.marginLeft"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Margin Right"
        field="style.marginRight"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Margin Top"
        field="style.marginTop"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Margin Bottom"
        field="style.marginBottom"
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
