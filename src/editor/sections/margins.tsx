import * as React from "react";
import { DimensionEditor } from "../components/dimensionEditor";
import { elementsState, activeElementState } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
export function Margins() {
  const [elements, setElements] = useRecoilState(elementsState);

  const activeElement = useRecoilValue(activeElementState);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (
      activeElement.props?.style?.marginLeft !== undefined ||
      activeElement.props?.style?.marginRight !== undefined ||
      activeElement.props?.style?.marginTop !== undefined ||
      activeElement.props?.style?.marginBottom !== undefined
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
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          paddingTop: 4,
        }}
      >
        <span style={{ fontSize: 15, flex: 1 }}>Margin</span>
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
            title="Margin Left"
            field="props.style.marginLeft"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            title="Margin Right"
            field="props.style.marginRight"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            title="Margin Top"
            field="props.style.marginTop"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            title="Margin Bottom"
            field="props.style.marginBottom"
            activeElement={activeElement}
            setElements={setElements}
          />
        </>
      )}
    </div>
  );
}
