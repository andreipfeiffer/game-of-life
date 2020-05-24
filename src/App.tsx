import React from "react";
import "./App.css";
import { Grid, Preset } from "./types";
import { getInitialState, getNextPopulation } from "./utils";
import { useInterval } from "./hooks";
import Life from "./Life";
import LifeCanvas from "./LifeCanvas";

interface Props {
  presets: Preset[];
}

const MIN_LENGTH = 4;
const DEFAULT_SIZE = 30;
const LifetimeValues: Record<
  number,
  { value: number; label: string }
> = Object.freeze({
  1: { value: 1, label: "requestAnimationFrame()" },
  2: { value: 16, label: "16ms" },
  3: { value: 100, label: "100ms" },
  4: { value: 300, label: "300ms" },
  5: { value: 500, label: "0.5s" },
});

console.log(Object.keys(LifetimeValues).reverse()[1]);

type Renderer = "html" | "canvas";

function App(props: Props) {
  const { presets } = props;

  const [play, setPlay] = React.useState(true);
  const [renderer, setRenderer] = React.useState<Renderer>("html");
  const [lifetime, setLifetime] = React.useState(
    +Object.keys(LifetimeValues).reverse()[0]
  );
  const [width, setWidth] = React.useState(presets[0].grid[0].length);
  const [height, setHeight] = React.useState(presets[0].grid.length);
  const [size, setSize] = React.useState(presets[0].size || DEFAULT_SIZE);
  const [manualChange, increaseManualChange] = React.useState(0);
  const [preset, setPreset] = React.useState(presets[0].id);

  const [population, setPopulation] = React.useState<Grid>(
    getInitialState(presets[0].grid, width, height)
  );

  useInterval(nextGeneration, play ? LifetimeValues[lifetime].value : null);

  const optimizedToggleCell = React.useCallback(toggleCell, [
    width,
    height,
    manualChange,
  ]);

  return (
    <div>
      Preset:{" "}
      <select value={preset} onChange={(e) => loadPreset(e.target.value)}>
        <option value="">Select a preset</option>
        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.description}
          </option>
        ))}
      </select>
      <select
        value={renderer}
        onChange={(e) => setRenderer(e.target.value as Renderer)}
        style={{ marginLeft: "-1px" }}
      >
        <option key="html" value="html">
          HTML
        </option>
        <option key="canvas" value="canvas">
          Canvas
        </option>
      </select>{" "}
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
      Size:{" "}
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(+e.target.value)}
        maxLength={3}
        className="input"
      />{" "}
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => setPlay(!play)}>{play ? "Stop" : "Play"}</button>{" "}
        {/* {play === false && (
        <button onClick={output} className="secondary">
          Output
        </button>
      )}{" "} */}
        <input
          type="range"
          value={lifetime}
          min={1}
          max={5}
          onChange={(e) => setLifetime(+e.target.value)}
          list="lifetime-options"
          // className="input"
          style={{ margin: "0 1em" }}
        />
        <datalist id="lifetime-options">
          {Object.entries(LifetimeValues).map(([k, v]) => (
            <option key={k} value={k} label={v.label} />
          ))}
        </datalist>{" "}
        <div>{LifetimeValues[lifetime].label}</div>
      </div>
      <hr />
      <div className={`${play ? "playing" : ""}`}>
        {renderer === "canvas" ? (
          <LifeCanvas population={population} size={size} />
        ) : (
          <Life
            population={population}
            onToggle={optimizedToggleCell}
            size={size}
          />
        )}
      </div>
    </div>
  );

  function nextGeneration() {
    setPopulation(getNextPopulation(population));
  }

  function updateWidth(value: number) {
    const newWidth = Math.max(value, MIN_LENGTH);
    setWidth(newWidth);
    setPreset("");
    setPopulation(getInitialState(population, newWidth, height));
  }

  function updateHeight(value: number) {
    const newHeight = Math.max(value, MIN_LENGTH);
    setHeight(newHeight);
    setPreset("");
    setPopulation(getInitialState(population, width, newHeight));
  }

  function loadPreset(id: string) {
    const newPreset = presets.find((p) => p.id === id);
    const newWidth = Math.max(newPreset?.width ?? 0, width);
    const newHeight = Math.max(newPreset?.height ?? 0, height);
    const newSize = newPreset?.size || DEFAULT_SIZE;

    setHeight(newHeight);
    setWidth(newWidth);
    setWidth(newWidth);
    setSize(newSize);
    setPreset(id);

    setPopulation(
      getInitialState(newPreset?.grid || population, newWidth, newHeight)
    );
  }

  function toggleCell(x: number, y: number) {
    const newRow = [...population[y]];
    newRow[x] = !newRow[x];

    const newPopulation = [
      ...population.slice(0, y),
      newRow,
      ...population.slice(y + 1),
    ];

    setPopulation(newPopulation);
    setPreset("");
    increaseManualChange(manualChange + 1);
  }

  // function output() {
  //   console.log(JSON.stringify(population));
  // }
}

export default App;
