import * as React from "react";
import { useRecoilState } from "recoil";
import {
  activeElementIDState,
  elementsState,
  elementsHierarchyState,
} from "../atoms";
import { StudioElement, StudioElementMap } from "../types";
import { View, Text, Image } from "react-native";
export function Device(props: {}) {
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  const [elements /* setElements */] = useRecoilState(elementsState);
  const [hierarchy /* setElements */] = useRecoilState(elementsHierarchyState);

  return (
    <div
      style={{
        width: 375,
        height: 812,
        transform: "scale(0.8)",
        borderRadius: 4,
        backgroundColor: "white",
        color: "black",
        flexDirection: "row",
        overflow: "scroll",
        display: "flex",
        alignContent: "flex-start",
      }}
    >
      {hierarchy.map((e: any, i: number) => {
        return <Component elementID={e.id} index={i} elements={elements} />;
      })}
    </div>
  );
}
function Component(props: {
  elementID: string;
  index?: number;
  elements: StudioElementMap;
}) {
  const e = props.elements[props.elementID];
  if (e.component === "View") {
    return (
      <>
        {/*        <View
          style={{
            backgroundColor: e.style?.backgroundColor,
            width: "100%",
            height: "100%",
            flexDirection: e.style?.flexDirection,
            alignItems: e.style?.alignItems,
            justifyContent: e.style?.justifyContent,
            borderRadius: e.style?.borderRadius,
            flex: e.style?.flex,
            position: "absolute",
            borderStyle: "solid",
            borderColor: "red",
            borderWidth: 2,
          }}
        /> */}
        <View
          onLayout={(e) => {
            console.log("onLayout", e);
          }}
          ref={(r) => {
            r?.measureInWindow((x, y, w, h) => {
              console.log("measureInWindow", x, y, w, h);
            });
          }}
          style={{
            backgroundColor: e.style?.backgroundColor,
            width: e.style?.width,
            height: e.style?.height,
            flexDirection: e.style?.flexDirection,
            alignItems: e.style?.alignItems,
            justifyContent: e.style?.justifyContent,
            borderRadius: e.style?.borderRadius,
            flex: e.style?.flex,
            position: "relative",
          }}
        >
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
        style={{
          backgroundColor: e.style?.backgroundColor,
          width: e.style?.width,
          height: e.style?.height,
          flexDirection: e.style?.flexDirection,
          alignItems: e.style?.alignItems,
          alignSelf: e.style?.alignSelf,
          justifyContent: e.style?.justifyContent,
          borderRadius: e.style?.borderRadius,
          flex: e.style?.flex,
          position: "relative",
        }}
      >
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
          source={{ uri: e.props?.source || "" }}
          style={{
            backgroundColor: e.style?.backgroundColor,
            width: e.style?.width,
            height: e.style?.height,
            flexDirection: e.style?.flexDirection,
            alignItems: e.style?.alignItems,
            justifyContent: e.style?.justifyContent,
            borderRadius: e.style?.borderRadius,
            flex: e.style?.flex,
            position: "relative",
          }}
        ></Image>
      </>
    );
  }
  return null;
}
