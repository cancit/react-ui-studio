import * as React from "react";
import { DimensionEditor } from "../components/dimensionEditor";
import { elementsState, activeElementState } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
export function Dimensions() {
  const [elements, setElements] = useRecoilState(elementsState);

  const activeElement = useRecoilValue(activeElementState);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (
      activeElement.props?.style?.width !== undefined ||
      activeElement.props?.style?.height !== undefined ||
      activeElement.props?.style?.maxWidth !== undefined ||
      activeElement.props?.style?.maxHeight !== undefined
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
        <span style={{ fontSize: 15, flex: 1 }}>Dimensions</span>
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
            key={"Width" + activeElement.id}
            title="Width"
            field="props.style.width"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            key={"Height" + activeElement.id}
            title="Height"
            field="props.style.height"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            key={"Max Width" + activeElement.id}
            title="Max Width"
            field="props.style.maxWidth"
            activeElement={activeElement}
            setElements={setElements}
          />
          <DimensionEditor
            key={"Max Height" + activeElement.id}
            title="Max Height"
            field="props.style.maxWidth"
            activeElement={activeElement}
            setElements={setElements}
          />
        </>
      )}
    </div>
  );
}
