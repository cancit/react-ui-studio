import { atom, selector } from "recoil";
import { StudioElement, StudioElementMap } from "../types";
import test from "./test";
import { devices } from "../constants/devices";
export const activeElementIDState = atom({
  key: "activeElementIDState",
  default: "root",
});
export const elementsState = atom({
  key: "elementsState",
  default: {
    root: {
      component: "View",
      id: "root",
      name: "Root",
      custom: false,
      props: {
        style: {
          flex: 1,
          height: "100%",
        },
      },
    },
  } as StudioElementMap,
});

export const customComponentState = atom({
  key: "customComponentState",
  default: {} as { [key: string]: any },
});
export const activeElementState = selector({
  key: "activeElementState",
  get: ({ get }: { get: any }) => {
    const id = get(activeElementIDState);
    const list = get(elementsState);
    return list[id];
  },
});

export const editorTabState = atom({
  key: "editorTabState",
  default: "design",
});

export const zoomState = atom({
  key: "zoomState",
  default: 80,
});
export const deviceDimensionState = atom({
  key: "deviceDimensionState",
  default: devices[0],
});

export const refStore = atom({
  key: "refStore",
  default: {},
});
