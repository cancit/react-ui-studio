import * as React from "react";
import { useRecoilState } from "recoil";
import { activeElementIDState, elementsState, refStore } from "../atoms";
import { StudioElement, StudioElementMap } from "../types";
import { View, Text, Image } from "react-native";
import _ from "lodash";
const _refs = {} as any;
export function Device(props: {
  zoom: number;
  dimensions: { width: number; height: number };
}) {
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  const [elements, setElements] = useRecoilState(elementsState);

  const [refs, setRefs] = useRecoilState(refStore);
  const [pos, setPos] = React.useState({ x: 0, y: 0, w: 0, h: 0 });
  const [parentPos, setParentPos] = React.useState({ x: 0, y: 0, w: 0, h: 0 });
  const parentRef = React.useRef<View>();

  React.useEffect(() => {
    if (_refs[activeElementId] && _refs[activeElementId].measureInWindow) {
      parentRef.current!.measureInWindow(
        (x: number, y: number, w: number, h: number) => {
          setParentPos({ x, y, w, h });
        }
      );
      _refs[activeElementId].measureInWindow(
        (x: number, y: number, w: number, h: number) => {
          console.log("ref measuered");
          setPos({ x, y, w, h });
        }
      );
    }
  }, [activeElementId, elements, props.dimensions]);
  const { width, height } = props.dimensions;
  return (
    <>
      <div style={{ width, height, transform: `scale(${props.zoom})` }}>
        <View
          ref={parentRef as any}
          style={{
            // transform: "scale(0.8)",
            width,
            height,
            borderRadius: 4,
            backgroundColor: "white",
            flexDirection: "row",
            overflow: "scroll",
            display: "flex",
            alignContent: "flex-start",
            position: "relative",
          }}
        >
          <Component elementID={"root"} index={0} elements={elements} />

          {pos.w > 0 && pos.h > 0 && (
            <div
              style={{
                position: "absolute",
                borderColor: "#00adfe",
                opacity: 0.8,
                borderWidth: 4,
                borderStyle: "solid",
                left: (pos.x - parentPos.x) / props.zoom,
                top: (pos.y - parentPos.y) / props.zoom,
                width: pos.w - 8,
                height: pos.h - 8,
                pointerEvents: "none",
              }}
            ></div>
          )}
        </View>
      </div>
    </>
  );
}
function Component(props: {
  elementID: string;
  index?: number;
  elements: StudioElementMap;
}) {
  const e = props.elements[props.elementID];
  const mouse = {
    onMouseMove: () => {
      console.log("mouse move!");
    },
  };
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  if (e.component === "View") {
    return (
      <>
        <View
          ref={(r) => {
            _refs[e.id] = r;
            // setRefs();
          }}
          style={{
            backgroundColor: e.style?.backgroundColor,
            width: e.style?.width,
            height: e.style?.height,
            flexDirection: e.style?.flexDirection,
            alignItems: e.style?.alignItems,
            justifyContent: e.style?.justifyContent,
            borderRadius: e.style?.borderRadius,
            marginLeft: e.style?.marginLeft,
            marginRight: e.style?.marginRight,
            marginTop: e.style?.marginTop,
            marginBottom: e.style?.marginBottom,
            flex: e.style?.flex,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            onMouseDown={() => {
              console.log("onMouseMove");
              if (activeElementId !== e.id) {
                setActiveElementID(e.id);
              }
            }}
          />
          {
            e.children
              ? e.children.map((a, i) => (
                  <Component
                    elementID={a}
                    index={i}
                    elements={props.elements}
                  />
                ))
              : null
            /*  <Text>{e.name || (props.index || 0) + 1}</Text> */
          }
        </View>
      </>
    );
  } else if (e.component === "Text") {
    return (
      <Text
        ref={(r) => {
          _refs[e.id] = r;
          // setRefs();
        }}
        style={{
          backgroundColor: e.style?.backgroundColor,
          width: e.style?.width,
          height: e.style?.height,
          flexDirection: e.style?.flexDirection,
          alignItems: e.style?.alignItems,
          alignSelf: e.style?.alignSelf,
          justifyContent: e.style?.justifyContent,
          borderRadius: e.style?.borderRadius,
          marginLeft: e.style?.marginLeft,
          marginRight: e.style?.marginRight,
          marginTop: e.style?.marginTop,
          marginBottom: e.style?.marginBottom,
          color: e.style?.color,
          fontSize: e.style?.fontSize,
          flex: e.style?.flex,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
          onMouseDown={() => {
            console.log("onMouseMove");
            if (activeElementId !== e.id) {
              setActiveElementID(e.id);
            }
          }}
        />
        {e.children ? (
          e.children.map((a, i) => (
            <Component elementID={a} index={i} elements={props.elements} />
          ))
        ) : (
          <Text>{e.text}</Text>
        )}
      </Text>
    );
  } else if (e.component === "Image") {
    return (
      <>
        <Image
          ref={(r) => {
            _refs[e.id] = r;
          }}
          source={{ uri: e.props?.source || "" }}
          style={{
            backgroundColor: e.style?.backgroundColor,
            width: e.style?.width,
            height: e.style?.height,
            flexDirection: e.style?.flexDirection,
            alignItems: e.style?.alignItems,
            justifyContent: e.style?.justifyContent,
            borderRadius: e.style?.borderRadius,
            marginLeft: e.style?.marginLeft,
            marginRight: e.style?.marginRight,
            marginTop: e.style?.marginTop,
            marginBottom: e.style?.marginBottom,
            flex: e.style?.flex,
            position: "relative",
          }}
        ></Image>
      </>
    );
  }
  return null;
}
