import * as React from "react";
import { DimensionEditor } from "../components/dimensionEditor";
import { elementsState, activeElementState } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
export function Paddings() {
  const [elements, setElements] = useRecoilState(elementsState);

  const activeElement = useRecoilValue(activeElementState);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (
      activeElement.props?.style?.paddingLeft !== undefined ||
      activeElement.props?.style?.paddingRight !== undefined ||
      activeElement.props?.style?.paddingTop !== undefined ||
      activeElement.props?.style?.paddingBottom !== undefined
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [activeElement]);
  return (
    <div>
      <div
        style={{
          borderTop: "1px solid white",
          paddingTop: 8,
          display: "flex",
          flexDirection: "row",
          marginTop: 4,
        }}
      >
        <span style={{ fontSize: 15, flex: 1 }}>Padding</span>
        <span
          onClick={() => {
            setVisible((visible) => !visible);
          }}
          style={{}}
        >
          +
        </span>
      </div>
      {visible && (
        <>
          <DimensionEditor
            title="Left"
            field="props.style.paddingLeft"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            title="Right"
            field="props.style.paddingRight"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            title="Top"
            field="props.style.paddingTop"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            title="Bottom"
            field="props.style.paddingBottom"
            activeElement={activeElement}
            setElements={setElements}
          />
        </>
      )}
    </div>
  );
}
