import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body,
html,
#root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

html{
    font-size:62.5%
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

`;
