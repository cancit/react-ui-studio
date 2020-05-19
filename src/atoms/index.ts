import { atom, selector } from "recoil";
import { StudioElement, StudioElementMap } from "../types";
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
      props: {
        style: {
          flex: 1,
          height: "100%",
        },
      },
    },
  } as StudioElementMap,
});

export const activeElementState = selector({
  key: "activeElementState",
  get: ({ get }: { get: any }) => {
    const id = get(activeElementIDState);
    const list = get(elementsState);
    return list[id];
  },
});

export const refStore = atom({
  key: "refStore",
  default: {},
});
