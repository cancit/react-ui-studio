import * as React from "react";
import { uuidv4 } from "../util";
import { StudioElement, StudioElementMap } from "../types";
import {
  elementsState,
  activeElementIDState,
  editorTabState,
  zoomState,
  deviceDimensionState,
  customComponentState,
} from "../atoms";
import { useRecoilState } from "recoil";
import { colors } from "../constants/colors";
import { devices } from "../constants/devices";
import { getChildren, strToFunction } from "../editor/code/parser";
import { RemotePreview } from "./remotePreview";
import hello_world from "../examples/hello_world.json";

export function TopBar(props: {}) {
  const [elements, setElements] = useRecoilState(elementsState);
  const [activeElementId, setActiveElementID] = useRecoilState(
    activeElementIDState
  );
  const [tab, setTab] = useRecoilState(editorTabState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [dimensions, setDimensions] = useRecoilState(deviceDimensionState);
  const [customComponents, setCustomComponents] = useRecoilState(
    customComponentState
  );

  const addElement = (newElement: StudioElement, parentId?: string) => {
    if (!parentId) {
      parentId = activeElementId;
    }
    setElements((elements: StudioElementMap) => {
      return {
        ...elements,
        [parentId!]: {
          ...elements[parentId!],
          children: [
            ...(elements[parentId!].children || []).concat(newElement.id),
          ],
        },
        [newElement.id]: newElement,
      };
    });
  };

  React.useEffect(() => {
    console.log("useEffect", "savedCustomComponents");
    let savedElements = hello_world.savedElements as any;
    const savedCustomComponents = hello_world.savedCustomComponents as any;
    Object.keys(savedCustomComponents).forEach((s) => {
      savedCustomComponents[s].func = strToFunction(
        savedCustomComponents[s].code
      );

      const ch = getChildren(savedCustomComponents[s].code);
      ch.forEach((element: any) => {
        savedElements[element.id] = element;
      });
      // savedElements[ch[0].id] = ch[0];
      //    savedElements = { ...savedElements, ...ch[0] };
      savedElements[s].children = [ch[0].id];
    });

    setCustomComponents(savedCustomComponents);
    console.log("savedCustomComponents", savedCustomComponents);
    console.log("savedElements", savedElements);
    setElements(savedElements);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          height: 40,
          backgroundColor: colors.background,
          display: "flex",
          flexDirection: "row",
          paddingLeft: 8,
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            const savedElements = JSON.parse(
              window.localStorage.getItem("savedElements") || ""
            );
            const savedCustomComponents = JSON.parse(
              window.localStorage.getItem("savedCustomComponents") || "{}"
            );
            Object.keys(savedCustomComponents).forEach((s) => {
              savedCustomComponents[s].func = strToFunction(
                savedCustomComponents[s].code
              );
            });
            setCustomComponents(savedCustomComponents);
            console.log("savedCustomComponents", savedCustomComponents);
            setElements(savedElements);
          }}
        >
          <span className="material-icons">folder_open</span>
        </button>
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
            window.localStorage.setItem(
              "savedCustomComponents",
              JSON.stringify(customForSave)
            );
            window.localStorage.setItem(
              "savedElements",
              JSON.stringify(elements)
            );
            console.log(customComponents);
          }}
        >
          <span className="material-icons">save</span>
        </button>

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
            marginLeft: 12,
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          +<span className="material-icons">crop_square</span>
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
            display: "flex",
            alignItems: "center",
          }}
        >
          +<span className="material-icons">title</span>
        </button>
        <button
          onClick={() => {
            const newElement = {
              component: "Image",
              id: uuidv4(),
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
            display: "flex",
            alignItems: "center",
          }}
        >
          + <span className="material-icons">insert_photo</span>
        </button>
        <button
          onClick={() => {
            const textElement = {
              component: "Text",
              text: "Button",
              id: uuidv4(),
              props: {
                style: {
                  marginTop: 8,
                  marginBottom: 8,
                  marginLeft: 24,
                  marginRight: 24,
                  textAlign: "center",
                  color: "white",
                },
              },
            } as StudioElement;
            const newElement = {
              component: "TouchableOpacity",
              id: uuidv4(),
              props: {
                style: {
                  width: 100,
                  backgroundColor: "#00adfe",
                  borderRadius: 6,
                },
              },
            } as StudioElement;
            addElement(newElement);
            addElement(textElement, newElement.id);
          }}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: 18,
            borderRadius: 4,
            marginLeft: 12,
            display: "flex",
            alignItems: "center",
          }}
        >
          + Button
        </button>
        <button
          onClick={() => {
            const newElement = {
              component: "TextInput",
              id: uuidv4(),
              props: {
                defaultValue: "Selam",
                style: {
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  paddingBottom: 6,
                  paddingLeft: 4,
                  marginHorizontal: 12,
                },
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
            display: "flex",
            alignItems: "center",
          }}
        >
          + TextInput
        </button>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <RemotePreview />
          <span style={{ marginLeft: 12 }}>Zoom</span>
          {
            <input
              style={{ marginLeft: 12, width: 40, textAlign: "center" }}
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
          }
          <button
            onClick={() => {
              setDimensions((dm: any) => {
                return { width: dm.height, height: dm.width };
              });
            }}
            style={{
              backgroundColor: "black",
              border: "none",
              color: "white",
              fontSize: 16,
              borderRadius: 4,
              marginLeft: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18 }} className="material-icons">
              screen_rotation
            </span>
          </button>
          <select
            style={{ marginLeft: 8 }}
            onChange={(e) => {
              const i = parseInt(e.target.value) || 0;
              setDimensions({
                height: devices[i].height,
                width: devices[i].width,
              });
              setZoom(
                Math.round((window.innerHeight / devices[i].height) * 90)
              );
            }}
            defaultValue={1}
          >
            {devices.map((d, i) => (
              <option value={i}>{d.name}</option>
            ))}
          </select>
          {/*   <button
            onClick={() => {
              // ws.send(JSON.stringify({ type: "ui", elements: elements }));
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
          </button> */}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 6,
            color: "white",
            marginBottom: 6,
            minWidth: 280,
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => setTab("design")}
            style={{
              backgroundColor: tab === "design" ? "#2196F3" : "black",
              width: 80,
              color: "#EFEFEF",
              fontWeight: 800,
              textAlign: "center",
              paddingTop: 2,
              paddingBottom: 2,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          >
            Design
          </div>
          <div
            onClick={() => setTab("code")}
            style={{
              backgroundColor: tab === "code" ? "#2196F3" : "black",
              width: 80,
              color: "#EFEFEF",
              fontWeight: 800,
              textAlign: "center",
              paddingTop: 2,
              paddingBottom: 2,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            Code
          </div>
        </div>
      </div>
    </div>
  );
}
