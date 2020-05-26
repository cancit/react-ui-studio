import * as React from "react";
import { Device } from "./device";
import { uuidv4 } from "../util";
import { useRecoilState } from "recoil";
import {
  activeElementIDState,
  elementsState,
  zoomState,
  deviceDimensionState,
} from "../atoms";
import _ from "lodash";
import { StudioElement, StudioElementMap } from "../types";
const devices = [
  {
    name: "iPhone 8",
    width: 414,
    height: 736,
  },
  {
    name: "iPhone X",
    width: 375,
    height: 812,
  },
  {
    name: "iPad",
    width: 768,
    height: 1024,
  },
];

export function Container() {
  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [dimensions, setDimensions] = useRecoilState(deviceDimensionState);

  React.useEffect(() => {
    setZoom(Math.round((window.innerHeight / dimensions.height) * 90));
    const listener = () => {
      setZoom(Math.round((window.innerHeight / dimensions.height) * 90));
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  return (
    /*     <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          height: 40,
          backgroundColor: "#282c34",
          display: "flex",
          paddingLeft: 8,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            const newElement = {
              component: "View",
              id: uuidv4(),
              props: {
                style: { height: 100, width: 100, backgroundColor: "gray" },
              },
            } as StudioElement;
            addElement(newElement);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
          }}
        >
          + View
        </button>
        <button
          onClick={() => {
            const newElement = {
              component: "Text",
              id: uuidv4(),
              text: "Text",
            } as StudioElement;
            addElement(newElement);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          + Text
        </button>
        <button
          onClick={() => {
            const newElement = {
              component: "Image",
              id: uuidv4(),
              text: "Text",
              props: {
                style: { width: 100, height: 100 },
                source:
                  "https://media-exp1.licdn.com/dms/image/C4E03AQECzOkRLMF1Vg/profile-displayphoto-shrink_400_400/0?e=1594857600&v=beta&t=ACeq2JlNFJ3y7Nxu7ZHKcIhWzNTtHQnL_DBZW6Sw59c",
              },
            } as StudioElement;
            addElement(newElement);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          + Image
        </button>
        <div style={{ display: "flex" }} />
        <span style={{ marginLeft: 12 }}>Zoom</span>
        <input
          style={{ marginLeft: 12 }}
          type={"number"}
          value={zoom}
          defaultValue={zoom}
          onChange={(event) => {
            let val = Math.round(parseInt(event.target.value));
            if (val > 200) {
              val = 200;
            }
            setZoom(val);
          }}
        />
        <button
          onClick={() => {
            setDimensions((dm) => {
              return { width: dm.height, height: dm.width };
            });
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          Rotate
        </button>
        <select
          style={{ marginLeft: 8 }}
          onChange={(e) => {
            const i = parseInt(e.target.value) || 0;
            setDimensions({
              height: devices[i].height,
              width: devices[i].width,
            });
            setZoom(Math.round((window.innerHeight / devices[i].height) * 90));
          }}
          defaultValue={1}
        >
          {devices.map((d, i) => (
            <option value={i}>{d.name}</option>
          ))}
        </select>
        <button
          onClick={() => {
            ws.send(JSON.stringify({ type: "ui", elements: elements }));
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          Preview
        </button>
      </div> */
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "#424e5059",
          position: "relative",
          overflow: "scroll",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          // minHeight: zoom * dimensions.height + 48,
        }}
      >
        {/*  <div
          style={{ transform: `scale(${zoom})`, paddingTop: 0, margin: "auto" }}
        > */}
        <div
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <Device zoom={zoom / 100} dimensions={dimensions} />
        </div>
        {/*   </div> */}
      </div>
    </div>
  );
}
