import { Grid } from "./types";

export function getInitialState(
  start: Array<Array<any>>,
  width: number,
  height: number
): Grid {
  const result: Grid = [];

  for (let row = 0; row < height; row += 1) {
    result[row] = [];

    for (let col = 0; col < width; col += 1) {
      result[row][col] = !!start?.[row]?.[col];
    }
  }

  return result;
}

export function getStringGrid(grid: Grid): string {
  return grid
    .map((row) => {
      return row.map((cell) => (cell ? "x" : " ")).join("");
    })
    .join("\n");
}

export function getNextPopulation(grid: Array<Array<any>>): Grid {
  const next: Grid = [];

  for (let row = 0; row < grid.length; row += 1) {
    next[row] = [];

    for (let col = 0; col < grid[row].length; col += 1) {
      const isAlive = !!grid[row][col];
      const neighbors = getNeighbors(grid, row, col);
      const alive = neighbors.filter((cell) => !!cell);

      if (alive.length === 3) {
        next[row][col] = true;
      } else if (alive.length === 2 && isAlive) {
        next[row][col] = true;
      } else {
        next[row][col] = false;
      }

      // console.log({
      //   row,
      //   col,
      //   alive,
      //   current: grid[row][col],
      //   next: next[row][col],
      // });
    }
  }

  return next;
}

export function getNeighbors(
  grid: Array<Array<any>>,
  row: number,
  col: number
): Array<any> {
  const height = grid.length;
  const width = grid[0].length;

  const prevX = col > 0 ? col - 1 : width - 1;
  const nextX = col < width - 1 ? col + 1 : 0;

  const prevY = row > 0 ? row - 1 : height - 1;
  const nextY = row < height - 1 ? row + 1 : 0;

  return [
    grid[prevY][prevX], // top left
    grid[prevY][col], // top
    grid[prevY][nextX], // top right
    grid[row][prevX], // left
    grid[row][nextX], // right
    grid[nextY][prevX], // bottom left
    grid[nextY][col], // bottom
    grid[nextY][nextX], // bottom right
  ];
}
