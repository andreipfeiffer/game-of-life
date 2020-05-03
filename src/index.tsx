import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import { getPresets } from "./presets";

const presets = getPresets();

ReactDOM.render(
  <React.StrictMode>
    <App start={presets[0].grid} presets={presets} />
  </React.StrictMode>,
  document.getElementById("root")
);
