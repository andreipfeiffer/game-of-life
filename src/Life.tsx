import React from "react";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
  onToggle(x: number, y: number): void;
}

function Life(props: Props) {
  const { population, onToggle } = props;

  return (
    <table className="life">
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
        className={`cell${alive ? " cell-alive" : ""}`}
        onClick={() => onToggle(x, y)}
      ></td>
    );
  }
}

export default Life;
