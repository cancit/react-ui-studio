import * as React from "react";
import { FieldEditor } from "./components/fieldEditor";
import {
  elementsState,
  activeElementState,
  activeElementIDState,
} from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { StyleAlignSelf } from "../types";
import _ from "lodash";
import { Dimensions } from "./sections/dimensions";
import { Margins } from "./sections/margins";
import { Paddings } from "./sections/paddings";
export function ImageEditor() {
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
        title="Source"
        field="props.source"
        type="text"
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
