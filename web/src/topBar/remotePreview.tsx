import * as React from "react";
import { elementsState, customComponentState } from "../atoms";
import { useRecoilState } from "recoil";
var ws: WebSocket;

export function RemotePreview() {
  const [elements] = useRecoilState(elementsState);
  const [customComponents] = useRecoilState(customComponentState);

  React.useEffect(() => {
    if (!ws) {
      ws = new WebSocket("ws://192.168.1.192:8080");
    }
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
  return (
    <button
      style={{
        marginLeft: 12,
        backgroundColor: "black",
        border: "none",
        color: "white",
        fontSize: 18,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        const customForSave = {} as any;
        Object.keys(customComponents).forEach((c) => {
          customForSave[c] = { ...customComponents[c], func: undefined };
        });
        ws.send(
          JSON.stringify({
            type: "ui",
            elements: elements,
            customComponents: customForSave,
          })
        );
      }}
    >
      <span className="material-icons">refresh</span>
    </button>
  );
}
