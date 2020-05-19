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
  }, [activeElementId, elements, props.dimensions, props.zoom]);
  const { width, height } = props.dimensions;
  return (
    <>
      <div
        style={{
          width,
          height,
          transform: `scale(${props.zoom})`,
        }}
      >
        <View
          style={{
            // transform: "scale(0.8)",
            width: width + 16,
            height: height + 16,
            borderRadius: 4,
            flexDirection: "row",
            overflow: "scroll",
            display: "flex",
            alignContent: "flex-start",
            position: "relative",
            paddingLeft: 8,
            paddingTop: 8,
          }}
        >
          <View
            ref={parentRef as any}
            style={{
              // transform: "scale(0.8)",
              width,
              height,
              backgroundColor: "white",
              flexDirection: "row",
              overflow: "scroll",
              display: "flex",
              alignContent: "flex-start",
              position: "relative",
            }}
          >
            <Component elementID={"root"} index={0} elements={elements} />
          </View>
          {pos.w > 0 && pos.h > 0 && (
            <div
              style={{
                position: "absolute",
                borderColor: "#4286f4",

                borderWidth: 3,
                borderStyle: "solid",
                left: (pos.x - parentPos.x) / props.zoom + 5,
                top: (pos.y - parentPos.y) / props.zoom + 5,
                width: pos.w,
                height: pos.h,
                pointerEvents: "none",
                overflow: "",
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  background: "white",
                  top: -8,
                  left: -8,
                  position: "absolute",
                  border: "3px solid #4286f4",
                  zIndex: 1000,
                }}
              />
              <div
                style={{
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  background: "white",
                  top: -8,
                  right: -8,
                  position: "absolute",
                  border: "3px solid #4286f4",
                  zIndex: 1000,
                }}
              />
              <div
                style={{
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  background: "white",
                  bottom: -8,
                  right: -8,
                  position: "absolute",
                  border: "3px solid #4286f4",
                  zIndex: 1000,
                }}
              />
              <div
                onMouseDown={() => {
                  console.log("mouseDown");
                }}
                onMouseUp={() => {
                  console.log("mouseUp");
                }}
                style={{
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  background: "white",
                  bottom: -8,
                  left: -8,
                  position: "absolute",
                  border: "3px solid #4286f4",
                  zIndex: 1000,
                }}
              />
            </div>
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
            /*             backgroundColor: e.props?.style?.backgroundColor,
            width: e.props?.style?.width,
            height: e.props?.style?.height,
            flexDirection: e.props?.style?.flexDirection,
            alignItems: e.props?.style?.alignItems,
            alignSelf: e.props?.style?.alignSelf,
            justifyContent: e.props?.style?.justifyContent,
            borderRadius: e.props?.style?.borderRadius,
            marginLeft: e.props?.style?.marginLeft,
            marginRight: e.props?.style?.marginRight,
            marginTop: e.props?.style?.marginTop,
            marginBottom: e.props?.style?.marginBottom,
            flex: e.props?.style?.flex, */
            position: "relative",
            ...e.props?.style,
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
          >
            {/*   <div
              style={{
                borderRadius: "50%",
                width: 10,
                height: 10,
                background: "blue",
                top: -3,
                left: -3,
                position: "absolute",
                border: "5px solid #4286f4;",
              }}
            ></div> */}
          </div>
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
          /*         backgroundColor: e.props?.style?.backgroundColor,
          width: e.props?.style?.width,
          height: e.props?.style?.height,
          flexDirection: e.props?.style?.flexDirection,
          alignItems: e.props?.style?.alignItems,
          alignSelf: e.props?.style?.alignSelf,
          justifyContent: e.props?.style?.justifyContent,
          borderRadius: e.props?.style?.borderRadius,
          marginLeft: e.props?.style?.marginLeft,
          marginRight: e.props?.style?.marginRight,
          marginTop: e.props?.style?.marginTop,
          marginBottom: e.props?.style?.marginBottom,
          color: e.props?.style?.color,
          fontSize: e.props?.style?.fontSize,
          flex: e.props?.style?.flex, */
          position: "relative",
          ...e.props?.style,
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
            /*           backgroundColor: e.props?.style?.backgroundColor,
            width: e.props?.style?.width,
            height: e.props?.style?.height,
            flexDirection: e.props?.style?.flexDirection,
            alignItems: e.props?.style?.alignItems,
            justifyContent: e.props?.style?.justifyContent,
            borderRadius: e.props?.style?.borderRadius,
            marginLeft: e.props?.style?.marginLeft,
            marginRight: e.props?.style?.marginRight,
            marginTop: e.props?.style?.marginTop,
            marginBottom: e.props?.style?.marginBottom,
            flex: e.props?.style?.flex, */
            position: "relative",
            ...e.props?.style,
          }}
        >
          {/*   <div
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
          /> */}
        </Image>
      </>
    );
  }
  return null;
}
