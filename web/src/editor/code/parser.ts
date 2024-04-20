import { uuidv4 } from "../../util";

const Babel = require("@babel/standalone");
const BabelParser = require("@babel/parser");

(window as any).Babel2 = require("@babel/standalone");
export function parseTransformedCode(transformedCode: string) {
  const requires = {
    react: require("react"),
    "react-native": require("react-native"),
  };
  (window as any).requires = requires;
  const res = eval(
    `function require(name){return window.requires[name]}` +
      transformedCode +
      "(()=>{return(exports)})()"
  );
  return res.default;
}
export function transformCode(code: string) {
  const transformed = Babel.transform(code, {
    filename: "file.tsx",
    presets: ["es2015", "react", "typescript"],
    plugins: ["proposal-class-properties"],
  });

  return transformed.code;
}

export function getChildren(code: string) {
  const rawAst = BabelParser.parse(code, {
    sourceType: "module",
    presets: ["es2015", "react", "typescript"],
    plugins: ["proposal-class-properties", "typescript", "jsx"],
  });
  console.log("rawAst", rawAst);

  const initialAst = rawAst.program.body
    .find((astNode: any) => astNode.type === "ExportDefaultDeclaration")
    .declaration?.body.body.find(
      (astNode: any) => astNode.type === "ReturnStatement"
    ).argument;

  console.log(
    "initialAst",
    JSON.stringify(reduceAstNode([], null, initialAst))
  );
  return reduceAstNode([], null, initialAst);
}

const reduceAstNode = (oldNode: any, parentNode: any, currentNode: any) => {
  let element = {} as any;
  if (currentNode.type === "JSXElement") {
    let name = currentNode.openingElement.name.name;
    if (!name && currentNode.openingElement.name.object) {
      name = [
        currentNode.openingElement.name.object.name,
        currentNode.openingElement.name.property.name,
      ].join(".");
    }
    element = {
      id: uuidv4(),
      component: name,
      children: [],
    };
    oldNode.push(element);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(element.id);
    }
  }
  if (currentNode.type === "JSXExpressionContainer") {
    parentNode.text = currentNode.expression.value;
  }
  if ("children" in currentNode) {
    currentNode.children.forEach((node: any) =>
      oldNode.length > 0
        ? reduceAstNode(oldNode, element, node)
        : reduceAstNode(oldNode, element, node)
    );
  }
  return oldNode;
};

export function strToFunction(code: string) {
  return parseTransformedCode(transformCode(code));
}
