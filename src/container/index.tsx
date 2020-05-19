import * as React from "react";
import { Device } from "./device";
import { uuidv4 } from "../util";
import { useRecoilState } from "recoil";
import { activeElementIDState, elementsState } from "../atoms";
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
var ws = new WebSocket("ws://192.168.1.21:8080");

export function Container() {
  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  const [zoom, setZoom] = React.useState(0.8);
  const [dimensions, setDimensions] = React.useState({
    width: 375,
    height: 812,
  });
  React.useEffect(() => {
    ws.onopen = () => {
      const message = "hello";
      ws.send("web");
      //   console.log(`Sent: ${message}`);
    };
    ws.onmessage = (e) => {
      console.log(`Received: ${e.data}`);
    };
    ws.onerror = (e: any) => {
      console.log(`Error: ${e.message}`);
    };
    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  }, []);
  const addElement = (newElement: StudioElement) => {
    setElements((elements: StudioElementMap) => {
      return {
        ...elements,
        [activeElementId]: {
          ...elements[activeElementId],
          children: [
            ...(elements[activeElementId].children || []).concat(newElement.id),
          ],
        },
        [newElement.id]: newElement,
      };
    });
  };
  React.useEffect(() => {
    setZoom((window.innerHeight / dimensions.height) * 0.9);
    const listener = () => {
      setZoom((window.innerHeight / dimensions.height) * 0.9);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  return (
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
          defaultValue={zoom * 100}
          onChange={(event) => {
            setZoom(parseInt(event.target.value) / 100);
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
            setZoom((window.innerHeight / devices[i].height) * 0.9);
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
      </div>
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
          style={
            {
              /*    width: dimensions.width * zoom,
            height: dimensions.height * zoom,
            margin: "auto", */
            }
          }
        >
          <Device zoom={zoom} dimensions={dimensions} />
        </div>
        {/*   </div> */}
      </div>
    </div>
  );
}
