import * as React from "react";
import { FieldEditor } from "./components/fieldEditor";
import { elementsState, activeElementState } from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { StyleJustifyContent } from "../types";
export function TextEditor() {
  const [elements, setElements] = useRecoilState(elementsState);
  const activeElement = useRecoilValue(activeElementState);
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
      {
        <span style={{ marginTop: 24 }}>
          {JSON.stringify(activeElement, null, 4)}
        </span>
      }
    </>
  );
}
