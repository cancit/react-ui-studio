import * as React from "react";
import { FieldEditor } from "./components/fieldEditor";
import { elementsState, activeElementState } from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  StyleFlexDirection,
  StyleJustifyContent,
  StyleAlignItems,
  StyleAlignSelf,
} from "../types";
export function ImageEditor() {
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
        title="Source"
        field="props.source"
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
        type="select"
        values={Object.keys(StyleFlexDirection)}
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Align Items"
        field="style.alignItems"
        type="select"
        values={Object.keys(StyleAlignItems)}
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
        type="select"
        values={Object.keys(StyleAlignSelf)}
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
