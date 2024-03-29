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
import { Dimensions } from "./sections/dimensions";
import { Margins } from "./sections/margins";
import { Paddings } from "./sections/paddings";

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
        type="number"
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
        title="Radius"
        field="props.style.borderRadius"
        type="number"
        activeElement={activeElement}
        setElements={setElements}
      />
      <FieldEditor
        title="Fill"
        field="props.style.backgroundColor"
        type="string"
        activeElement={activeElement}
        setElements={setElements}
      />
      <Dimensions />
      <Margins />
      <Paddings />

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
      {/* 
        <span style={{ marginTop: 24 }}>
          {JSON.stringify(activeElement, null, 4)}
        </span>
       */}
    </>
  );
}
