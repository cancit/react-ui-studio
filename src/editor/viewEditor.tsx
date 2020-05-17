import * as React from "react";
import { FieldEditor } from "./components/fieldEditor";
import {
  elementsState,
  activeElementState,
  activeElementIDState,
} from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  StyleFlexDirection,
  StyleJustifyContent,
  StyleAlignItems,
  StyleAlignSelf,
} from "../types";
import _ from "lodash";
export function ViewEditor() {
  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementId] = useRecoilState(
    activeElementIDState
  );

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
      <div>
        <FieldEditor
          title="Width"
          field="style.width"
          type="number"
          activeElement={activeElement}
          setElements={setElements}
        />
        <button
          onClick={() => {
            setElements((elements: any) => {
              const elems = _.cloneDeep(elements);
              const old = elems[activeElement.id];
              _.set(old, "style.width", undefined);
              elems[activeElement.id] = old;
              return elems;
            });
          }}
        >
          -
        </button>
      </div>
      <div>
        <FieldEditor
          title="Height"
          field="style.height"
          type="number"
          activeElement={activeElement}
          setElements={setElements}
        />
        <button
          onClick={() => {
            setElements((elements: any) => {
              const elems = _.cloneDeep(elements);
              const old = elems[activeElement.id];
              _.set(old, "style.height", undefined);
              elems[activeElement.id] = old;
              return elems;
            });
          }}
        >
          -
        </button>
      </div>
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
