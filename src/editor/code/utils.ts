import { StudioElement, StudioElementMap } from "../../types";
import { uuidv4 } from "../../util";

export function stringfyElements(
  element: StudioElement,
  all: StudioElementMap,
  componentNames: { [key: string]: number }
): { render: String; componentNames: { [key: string]: number } } {
  let str = "";
  componentNames[element.component] = 1;
  let head = `<${element.component}`;
  if (element.props?.style) {
    head += ` style={${stringifyObject(element.props?.style)}}`;
  }
  if (element.component === "Image" && element.props?.source) {
    head += ` source={{uri:"${element.props?.source}" }}`;
  }
  if (element.children && element.children?.length) {
    str = `${head}>
              ${element.children
                .map((e) => {
                  const child = stringfyElements(all[e], all, componentNames);
                  componentNames = {
                    ...componentNames,
                    ...child.componentNames,
                  };
                  return child.render;
                })
                .join("\n               ")}
           </${element.component}>
  `;
  } else if (element.text) {
    str = `${head}>
             {"${element.text}"}
           </${element.component}>`;
  } else {
    str = `   ${head}/>`;
  }
  return { render: str, componentNames: componentNames };
}

export function stringifyObject(obj_from_json: any) {
  if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)) {
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  if (obj_from_json === null) {
    return;
  }
  let props: any = Object.keys(obj_from_json)
    .map((key) => `${key}:${stringifyObject(obj_from_json[key])}`)
    .join(",");
  return `{${props}}`;
}

export function flattenReactTree(
  tree: { type: string; props: string; children: [] },
  map?: StudioElementMap,
  firstId?: string
) {
  if (!map) {
    map = {};
  }
  const obj = {
    id: firstId || uuidv4(),
    component: tree.type,
    props: tree.props,
    children: undefined,
  } as StudioElement;
  if (tree.children) {
    obj.children = tree.children.map((a: any) => {
      if (!a?.type) {
        if (a) {
          if (!obj.text) {
            obj.text = "";
          }
          obj.text += a;
        }
        return "-";
      }
      const res = flattenReactTree(a, map);
      return res.obj.id as string;
    });
    obj.children = obj.children.filter((f) => f !== "-");
    if (obj.children.length === 0) {
      delete obj.children;
    }
  }
  map[obj.id] = obj as any;
  return { map, obj };
}
