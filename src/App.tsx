import React from "react";
import "./App.css";
import { Grid, Preset } from "./types";
import { getInitialState, getNextPopulation } from "./utils";
import { useInterval } from "./hooks";
import Life from "./Life";

interface Props {
  presets: Preset[];
}

function App(props: Props) {
  const { presets } = props;

  const [play, setPlay] = React.useState(true);
  const [lifetime, setLifetime] = React.useState(1000);
  const [width, setWidth] = React.useState(presets[0].grid[0].length);
  const [height, setHeight] = React.useState(presets[0].grid.length);

  const [preset, setPreset] = React.useState(presets[0].id);

  const [population, setPopulation] = React.useState<Grid>(
    getInitialState(presets[0].grid, width, height)
  );

  useInterval(tick, play ? lifetime : null);

  function tick() {
    setPopulation(getNextPopulation(population));
  }

  function updateWidth(newWidth: number) {
    setWidth(newWidth);
    setPreset("");
    setPopulation(getInitialState(population, newWidth, height));
  }

  function updateHeight(newHeight: number) {
    setHeight(newHeight);
    setPreset("");
    setPopulation(getInitialState(population, width, newHeight));
  }

  return (
    <div>
      Preset:{" "}
      <select value={preset} onChange={(e) => loadPreset(e.target.value)}>
        <option value="">Presets</option>
        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.description}
          </option>
        ))}
      </select>
      <br />
      <br />
      Cycle :{" "}
      <input
        type="number"
        value={lifetime}
        onChange={(e) => setLifetime(+e.target.value)}
        maxLength={4}
        className="input"
      />{" "}
      Width:{" "}
      <input
        type="number"
        value={width}
        onChange={(e) => updateWidth(+e.target.value)}
        maxLength={3}
        className="input"
      />{" "}
      Height:{" "}
      <input
        type="number"
        value={height}
        onChange={(e) => updateHeight(+e.target.value)}
        maxLength={3}
        className="input"
      />{" "}
      <br />
      <br />
      <button onClick={() => setPlay(!play)}>
        {play ? "Stop" : "Play"}
      </button>{" "}
      <hr />
      <Life population={population} />
    </div>
  );

  function loadPreset(id: string) {
    const newPreset = presets.find((p) => p.id === id);
    setHeight(newPreset?.height || height);
    setWidth(newPreset?.width || width);
    setPopulation(newPreset?.grid || population);
    setPreset(id);
  }
}

export default App;
