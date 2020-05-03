import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { getPresets } from "./presets";

const presets = getPresets();

ReactDOM.render(
  <React.StrictMode>
    <App presets={presets} />
  </React.StrictMode>,
  document.getElementById("root")
);
