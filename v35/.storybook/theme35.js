import { create } from "@storybook/theming/create";
import logo35 from "../public/logo35.svg";

const font = new FontFace("format35", "url(../public/Format35VAR-Regular.ttf)");

export default create({
  base: "light",
  // Typography
  fontBase: '"Format35VAR-Regular", sans-serif',

  brandTitle: "v35",
  brandUrl: "https://thirty-five.com",
  brandImage: logo35,
  brandTarget: "_self",

  //
  colorPrimary: "#211AFF",
  colorSecondary: "#585C6D",

  // UI
  appBg: "#EFF0F6",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#cecece",
  appBorderRadius: 12,

  // Text colors
  textColor: "#000000",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#9E9E9E",
  barSelectedColor: "#585C6D",
  barHoverColor: "#585C6D",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#10162F",
  inputTextColor: "#10162F",
  inputBorderRadius: 2,
});
