export enum StyleJustifyContent {
  "flex-start" = "flex-start",
  "flex-end" = "flex-end",
  "center" = "center",
  "space-between" = "space-between",
  "space-around" = "space-around",
  "space-evenly" = "space-evenly",
}
export enum StyleFlexDirection {
  "column" = "column",
  "column-reverse" = "column-reverse",
  "row" = "row",
  "row-reverse" = "row-reverse",
}
export enum StyleAlignItems {
  "flex-start" = "flex-start",
  "flex-end" = "flex-end",
  "center" = "center",
  "stretch" = "stretch",
  "baseline" = "baseline",
}
export enum StyleAlignSelf {
  "flex-start" = "flex-start",
  "flex-end" = "flex-end",
  "center" = "center",
  "stretch" = "stretch",
  "baseline" = "baseline",
  "auto" = "auto",
}
export interface StudioElement {
  id: string;
  name?: string;
  text?: string;
  custom?: boolean;
  component: "View" | "Text" | "Image" | "TouchableOpacity";
  props?: {
    source?: string;
    style?: {
      flex?: number | undefined;
      width?: number | string;
      height?: number | string;
      backgroundColor?: string;
      flexDirection?: StyleFlexDirection;
      alignItems?: StyleAlignItems;
      justifyContent?: StyleJustifyContent;
      alignSelf?: StyleAlignSelf;
      borderRadius?: number;
      marginLeft?: number;
      marginRight?: number;
      marginTop?: number;
      marginBottom?: number;
      color?: string;
      fontSize?: number;
    };
  };
  children?: string[];
}

export type StudioElementMap = { [key: string]: StudioElement };
