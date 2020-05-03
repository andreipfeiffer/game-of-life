export type Grid = Array<Array<boolean>>;

export type Preset = {
  id: string;
  description: string;
  width: number;
  height: number;
  grid: Grid;
};
