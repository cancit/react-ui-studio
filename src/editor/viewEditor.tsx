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
        field="props.style.flex"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Flex Direction"
        field="props.style.flexDirection"
        type="select"
        values={Object.keys(StyleFlexDirection)}
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Align Items"
        field="props.style.alignItems"
        type="select"
        values={Object.keys(StyleAlignItems)}
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
        type="select"
        values={Object.keys(StyleAlignSelf)}
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
      <div>
        <FieldEditor
          title="Width"
          field="props.style.width"
          type="number"
          activeElement={activeElement}
          setElements={setElements}
        />
        <button
          onClick={() => {
            setElements((elements: any) => {
              const elems = _.cloneDeep(elements);
              const old = elems[activeElement.id];
              _.set(old, "props.style.width", undefined);
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
          field="props.style.height"
          type="number"
          activeElement={activeElement}
          setElements={setElements}
        />
        <button
          onClick={() => {
            setElements((elements: any) => {
              const elems = _.cloneDeep(elements);
              const old = elems[activeElement.id];
              _.set(old, "props.style.height", undefined);
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
      <FieldEditor
        title="Max Width"
        field="props.style.maxWidth"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <button
        onClick={() => {
          setElements((elements: any) => {
            const elems = _.cloneDeep(elements);
            const old = elems[activeElement.id];
            _.set(old, "props.style.maxWidth", undefined);
            elems[activeElement.id] = old;
            return elems;
          });
        }}
      >
        -
      </button>
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
