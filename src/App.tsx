import React from "react";

import { Preset } from "./types";
import { getInitialState, getNextPopulation } from "./utils";
import { useInterval } from "./hooks";
import { reducer } from "./store";

import Life from "./Life";
import LifeCanvas from "./LifeCanvas";
import Settings, { LifetimeValues } from "./Settings";

import "./App.css";

interface Props {
  presets: Preset[];
}

function App(props: Props) {
  const { presets } = props;

  const [store, dispatch] = React.useReducer(reducer, {
    play: false,
    renderer: "html",
    lifetime: +Object.keys(LifetimeValues).reverse()[0],
    width: 1,
    height: 1,
    size: 30,
    preset: "",
    population: getInitialState([], 1, 1),
  });

  const { play, renderer, lifetime, size, population } = store;

  useInterval(nextGeneration, play ? LifetimeValues[lifetime].value : null);

  return (
    <div>
      <Settings dispatch={dispatch} store={store} presets={presets} />
      <hr />
      <div className={`${play ? "playing" : ""}`}>
        {renderer === "canvas" ? (
          <LifeCanvas population={population} size={size} />
        ) : (
          <Life population={population} size={size} />
        )}
      </div>
    </div>
  );

  function nextGeneration() {
    dispatch({
      type: "SET_POPULATION",
      payload: getNextPopulation(population),
    });
  }
}

export default App;
