import React from "react";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
}

function Life(props: Props) {
  const { population } = props;

  return (
    <table className="life">{population.map((row) => renderRow(row))}</table>
  );

  function renderRow(row: boolean[]) {
    return <tr>{row.map((cell) => renderCell(cell))}</tr>;
  }

  function renderCell(alive: boolean) {
    return <td className={`cell${alive ? " cell-alive" : ""}`}></td>;
  }
}

export default Life;
