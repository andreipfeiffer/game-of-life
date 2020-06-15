import { Grid } from "./types";

export type Store = {
  play: boolean;
  renderer: Renderer;
  lifetime: number;
  width: number;
  height: number;
  size: number;
  preset: string;
  population: Grid;
};

export type Action =
  | { type: "SET_RENDERER"; payload: Renderer }
  | {
      type: "SET_LIFETIME" | "SET_WIDTH" | "SET_HEIGHT" | "SET_SIZE";
      payload: number;
    }
  | { type: "SET_PRESET"; payload: string }
  | { type: "SET_POPULATION"; payload: Grid }
  | { type: "TOGGLE_PLAY" };

export type Renderer = "html" | "canvas";

export function reducer(state: Store, action: Action): Store {
  if (action.type === "TOGGLE_PLAY") {
    return { ...state, play: !state.play };
  }

  if (action.type === "SET_RENDERER") {
    return { ...state, renderer: action.payload };
  }

  if (action.type === "SET_LIFETIME") {
    return { ...state, lifetime: action.payload };
  }

  if (action.type === "SET_WIDTH") {
    return { ...state, width: action.payload };
  }

  if (action.type === "SET_HEIGHT") {
    return { ...state, height: action.payload };
  }

  if (action.type === "SET_SIZE") {
    return { ...state, size: action.payload };
  }

  if (action.type === "SET_PRESET") {
    return { ...state, preset: action.payload };
  }

  if (action.type === "SET_POPULATION") {
    return { ...state, population: action.payload };
  }

  return state;
}
