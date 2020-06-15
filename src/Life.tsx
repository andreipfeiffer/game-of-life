import React from "react";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
  size: number;
}

const SIZE_THRESHOLD = 15;
const OptimizedRow = React.memo(Row);
const OptimizedCell = React.memo(Cell);

function Life(props: Props) {
  const { population, size } = props;

  const style = { "--size": `${size}px` } as React.CSSProperties;

  return (
    <div
      className={`life ${size < SIZE_THRESHOLD ? "small-size" : ""}`}
      style={style}
    >
      {population.map((row, y) => (
        <OptimizedRow key={y} row={row} y={y} />
      ))}
    </div>
  );
}

interface RowProps {
  row: Array<boolean>;
  y: number;
}

function Row(props: RowProps) {
  const { row } = props;
  return (
    <div className="row">
      {row.map((cell, x) => (
        <OptimizedCell key={x} alive={cell} />
      ))}
    </div>
  );
}

interface CellProps {
  alive: boolean;
}

function Cell(props: CellProps) {
  const { alive } = props;
  return <span className={`cell ${alive ? "cell-alive" : ""}`}></span>;
}

export default Life;
