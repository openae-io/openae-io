import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "./mathjax3.css";

const theme: Theme = {
  ...DefaultTheme,
};

export default theme;
