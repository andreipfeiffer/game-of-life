import React, { useEffect } from "react";
import { Preset } from "./types";
import "./Life.css";
import { Store, Action, Renderer } from "./store";
import { getInitialState } from "./utils";

type Props = {
  store: Store;
  dispatch: React.Dispatch<Action>;
  presets: Preset[];
};

const MIN_LENGTH = 4;
const DEFAULT_SIZE = 30;

export const LifetimeValues: Record<
  number,
  { value: number; label: string }
> = Object.freeze({
  1: { value: 1, label: "requestAnimationFrame()" },
  2: { value: 16, label: "16ms" },
  3: { value: 100, label: "100ms" },
  4: { value: 300, label: "300ms" },
  5: { value: 500, label: "0.5s" },
});

function Settings(props: Props) {
  const { store, dispatch, presets } = props;

  const {
    play,
    renderer,
    lifetime,
    width,
    height,
    size,
    preset,
    population,
  } = store;

  useEffect(() => {
    const initialPreset = window.localStorage.getItem("presetId") || "";
    initialPreset && loadPreset(initialPreset);
    // eslint-disable-next-line
  }, []);

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
        onChange={(e) =>
          dispatch({
            type: "SET_RENDERER",
            payload: e.target.value as Renderer,
          })
        }
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
        onChange={(e) =>
          dispatch({ type: "SET_SIZE", payload: +e.target.value })
        }
        maxLength={3}
        className="input"
      />{" "}
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => dispatch({ type: "TOGGLE_PLAY" })}>
          {play ? "Stop" : "Play"}
        </button>{" "}
        {preset && (
          <button
            onClick={() => loadPreset(preset)}
            style={{ marginLeft: "-1px" }}
          >
            ↺
          </button>
        )}
        <input
          type="range"
          value={lifetime}
          min={1}
          max={5}
          onChange={(e) =>
            dispatch({ type: "SET_LIFETIME", payload: +e.target.value })
          }
          list="lifetime-options"
          style={{ margin: "0 1em" }}
        />
        <datalist id="lifetime-options">
          {Object.entries(LifetimeValues).map(([k, v]) => (
            <option key={k} value={k} label={v.label} />
          ))}
        </datalist>{" "}
        <div>{LifetimeValues[lifetime].label}</div>
      </div>
    </div>
  );

  function updateWidth(value: number) {
    const newWidth = Math.max(value, MIN_LENGTH);
    dispatch({ type: "SET_WIDTH", payload: newWidth });
    dispatch({
      type: "SET_POPULATION",
      payload: getInitialState(population, newWidth, height),
    });
  }

  function updateHeight(value: number) {
    const newHeight = Math.max(value, MIN_LENGTH);
    dispatch({ type: "SET_HEIGHT", payload: newHeight });
    dispatch({
      type: "SET_POPULATION",
      payload: getInitialState(population, width, newHeight),
    });
  }

  function loadPreset(id: string) {
    const newPreset = presets.find((p) => p.id === id);
    const newWidth = newPreset?.width || width;
    const newHeight = newPreset?.height || height;
    const newSize = newPreset?.size || DEFAULT_SIZE;

    dispatch({ type: "SET_WIDTH", payload: newWidth });
    dispatch({ type: "SET_HEIGHT", payload: newHeight });
    dispatch({ type: "SET_SIZE", payload: newSize });
    dispatch({ type: "SET_PRESET", payload: id });

    window.localStorage.setItem("presetId", id);

    dispatch({
      type: "SET_POPULATION",
      payload: getInitialState(
        newPreset?.grid || population,
        newWidth,
        newHeight
      ),
    });
  }
}

export default Settings;
