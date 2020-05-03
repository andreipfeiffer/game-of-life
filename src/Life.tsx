import React from "react";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
  size: number;
  onToggle(x: number, y: number): void;
}

const SIZE_LIMIT = 15;

function Life(props: Props) {
  const { population, size, onToggle } = props;

  return (
    <table className={`life ${size < SIZE_LIMIT ? "life-border" : ""}`}>
      <tbody>{population.map((row, y) => renderRow(row, y))}</tbody>
    </table>
  );

  function renderRow(row: boolean[], y: number) {
    return <tr key={y}>{row.map((cell, x) => renderCell(cell, x, y))}</tr>;
  }

  function renderCell(alive: boolean, x: number, y: number) {
    return (
      <td
        key={`${y}${x}`}
        className={`cell ${alive ? "cell-alive" : ""} ${
          size < SIZE_LIMIT ? "no-border" : ""
        }`}
        onClick={() => onToggle(x, y)}
        style={{ width: size, height: size }}
      ></td>
    );
  }
}

export default Life;
