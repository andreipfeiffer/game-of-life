import React from "react";
import "./App.css";
import { Grid, Preset } from "./types";
import { getInitialState, getStringGrid, getNextPopulation } from "./utils";
import { useInterval } from "./hooks";

interface Props {
  start: Grid;
  presets: Preset[];
}

function App(props: Props) {
  const { start, presets } = props;

  const [play, setPlay] = React.useState(false);
  const [lifetime, setLifetime] = React.useState(1000);
  const [width, setWidth] = React.useState(start[0].length);
  const [height, setHeight] = React.useState(start.length);

  const [preset, setPreset] = React.useState("");

  const [population, setPopulation] = React.useState<Grid>(
    getInitialState(start, width, height)
  );

  const stringGrid = getStringGrid(population);

  useInterval(tick, play ? lifetime : null);

  function tick() {
    setPopulation(getNextPopulation(population));
  }

  function updateWidth(newWidth: number) {
    setWidth(newWidth);
    setPopulation(getInitialState(population, newWidth, height));
  }

  function updateHeight(newHeight: number) {
    setHeight(newHeight);
    setPopulation(getInitialState(population, width, newHeight));
  }

  return (
    <div>
      <button onClick={() => setPlay(!play)}>{play ? "Stop" : "Play"}</button>
      <input
        type="number"
        value={lifetime}
        onChange={(e) => setLifetime(+e.target.value)}
      />
      <input
        type="number"
        value={width}
        onChange={(e) => updateWidth(+e.target.value)}
      />
      <input
        type="number"
        value={height}
        onChange={(e) => updateHeight(+e.target.value)}
      />
      <select value={preset} onChange={(e) => setPreset(e.target.value)}>
        <option value="">Presets</option>
        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.description}
          </option>
        ))}
      </select>
      <button onClick={loadPreset}>Load preset</button>
      <br />
      <pre>{stringGrid}</pre>
    </div>
  );

  function loadPreset() {
    const newPreset = presets.find((p) => p.id === preset);
    setHeight(newPreset?.height || height);
    setWidth(newPreset?.width || width);
    setPopulation(newPreset?.grid || population);
  }
}

export default App;
