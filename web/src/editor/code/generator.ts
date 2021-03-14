import { StudioElementMap } from "../../types";
import { stringfyElements } from "./utils";

export function generateCode(props: {
  activeElementId: string;
  elements: StudioElementMap;
  customComponents: any;
}) {
  const { activeElementId, elements, customComponents } = props;

  const activeElement = elements[activeElementId];
  const imports = [`import * as React from \"react\"`];
  const renderInfo = stringfyElements(activeElement, elements, {});
  imports.push(
    `import { ${Object.keys(renderInfo.componentNames).join(
      ", "
    )} } from \"react-native\"`
  );
  const render = `return (
        ${renderInfo.render})
  `;
  const component = `
export default function () {

// Do not edit the content below this line
${render}
}
`;

  let all = "";
  all += imports.join("\n");
  all += component;
  return all;
}
