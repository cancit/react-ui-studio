import * as React from "react";
import { FieldEditor, String } from "./fieldEditor";
import _ from "lodash";
import { isString, isUndefined } from "util";

type Unit = "px" | "%" | "?";
export function DimensionEditor(props: {
  title: string;
  activeElement: any;
  field: string;
  setElements: (elements: any) => void;
}) {
  const { activeElement, setElements, field } = props;
  const activeValue = _.get(activeElement, field);
  const activeIntValue = isString(activeValue)
    ? parseInt(activeValue.substr(0, activeValue.length - 1))
    : !isNaN(activeValue)
    ? activeValue
    : 0;
  const [type, setType] = React.useState<Unit>(
    isUndefined(activeValue) ? "?" : !isString(activeValue) ? "px" : "%"
  );
  React.useEffect(() => {
    setType(
      isUndefined(activeValue) ? "?" : !isString(activeValue) ? "px" : "%"
    );
  }, [activeElement, activeValue]);
  const updateElements = (value: string, type: Unit) => {
    setElements((elements: any) => {
      const elems = _.cloneDeep(elements);
      const old = elems[activeElement.id];
      if (type === "?") {
        _.set(old, field, undefined);
      } else {
        _.set(
          old,
          field,
          type === "%" ? parseInt(value) + "%" : parseInt(value)
        );
      }
      elems[activeElement.id] = old;
      return elems;
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginTop: 12,
        }}
      >
        <span style={{ flex: 2, fontSize: 13 }}>{props.title}</span>
        <div
          style={{
            marginLeft: 8,
            flex: 3,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {type !== "?" ? (
            <input
              type={"number"}
              key={activeElement.id}
              style={{ flex: 3, border: "none" }}
              defaultValue={
                isString(activeValue)
                  ? parseInt(activeValue.substr(0, activeValue.length - 1))
                  : _.get(activeElement, field)
              }
              onChange={(event) => {
                updateElements(event.target.value, type);
              }}
            />
          ) : (
            <span style={{ flex: 1 }}>none</span>
          )}
          <select
            onChange={(event) => {
              setType(event.target.value as any);
              if (event.target.value === "?") {
              }
              updateElements(activeIntValue + "", event.target.value as Unit);
            }}
            defaultValue={type}
            style={{
              WebkitAppearance: "none",
              border: "none",
              borderRadius: 0,
              paddingRight: 4,
              paddingLeft: 4,
              textAlign: "center",
              borderLeft: "1px solid gray",
            }}
          >
            <option value={"px"}>px</option>
            <option value={"%"}>%</option>
            <option value={"?"}>?</option>
          </select>
        </div>
      </div>
    </div>
  );
}
