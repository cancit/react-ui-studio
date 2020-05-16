import _ from "lodash";
import * as React from "react";
export function FieldEditor(
  props:
    | {
        title: string;
        activeElement: any;
        field: string;
        type: "number" | "string" | "text";
        setElements: (elements: any) => void;
      }
    | {
        title: string;
        activeElement: any;
        field: string;
        values: any[];
        type: "select";
        setElements: (elements: any) => void;
      }
) {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: 12 }}>
      <span style={{ flex: 2, fontSize: 14 }}>{props.title}</span>
      {(props.type === "number" || props.type === "string") && (
        <String {...(props as any)} />
      )}
      {props.type === "text" && <TextEditor {...(props as any)} />}
      {props.type === "select" && <SelectEditor {...(props as any)} />}
    </div>
  );
}

function TextEditor(props: {
  activeElement: any;
  field: string;
  type: "number" | "string";
  setElements: (elements: any) => void;
}) {
  const { activeElement, setElements, field, type } = props;
  return (
    <textarea
      key={activeElement.id}
      style={{ marginLeft: 12, flex: 3 }}
      defaultValue={_.get(activeElement, field)}
      onChange={(event) => {
        console.log(event.target.value);
        setElements((elements: any) => {
          const elems = _.cloneDeep(elements);
          const old = elems[activeElement.id];
          _.set(
            old,
            field,
            type === "number"
              ? parseInt(event.target.value)
              : event.target.value
          );
          elems[activeElement.id] = old;
          return elems;
        });
      }}
    />
  );
}
function String(props: {
  activeElement: any;
  field: string;
  type: "number" | "string";
  setElements: (elements: any) => void;
}) {
  const { activeElement, setElements, field, type } = props;
  return (
    <input
      type={type}
      key={activeElement.id}
      style={{ marginLeft: 12, flex: 3 }}
      defaultValue={_.get(activeElement, field)}
      onChange={(event) => {
        console.log(event.target.value);
        setElements((elements: any) => {
          const elems = _.cloneDeep(elements);
          const old = elems[activeElement.id];
          _.set(
            old,
            field,
            type === "number"
              ? parseInt(event.target.value)
              : event.target.value
          );
          elems[activeElement.id] = old;
          return elems;
        });
      }}
    />
  );
}
function SelectEditor(props: {
  activeElement: any;
  field: string;
  values: any[];
  type: "number" | "string";
  setElements: (elements: any) => void;
}) {
  const { activeElement, setElements, field, type } = props;
  return (
    <select
      key={activeElement.id}
      style={{ marginLeft: 12, flex: 3 }}
      defaultValue={_.get(activeElement, field)}
      onChange={(event) => {
        console.log(event.target.value);
        setElements((elements: any) => {
          const elems = _.cloneDeep(elements);
          const old = elems[activeElement.id];
          _.set(
            old,
            field,
            type === "number"
              ? parseInt(event.target.value)
              : event.target.value
          );
          elems[activeElement.id] = old;
          return elems;
        });
      }}
    >
      {props.values.map((v) => (
        <option value={v}>{v}</option>
      ))}
    </select>
  );
}
