import React from "react";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
  size: number;
  onToggle(x: number, y: number): void;
}

const SIZE_LIMIT = 15;
const OptimizedRow = React.memo(Row);
const OptimizedCell = React.memo(Cell);

function Life(props: Props) {
  const { population, size, onToggle } = props;

  return (
    <div className={`life ${size < SIZE_LIMIT ? "life-border" : ""}`}>
      {population.map((row, y) => (
        <OptimizedRow key={y} row={row} y={y} size={size} onToggle={onToggle} />
      ))}
    </div>
  );
}

interface RowProps {
  row: Array<boolean>;
  y: number;
  size: number;
  onToggle(x: number, y: number): void;
}

function Row(props: RowProps) {
  const { y, size, row, onToggle } = props;
  return (
    <div key={y} className="row">
      {row.map((cell, x) => (
        <OptimizedCell
          key={`${y}${x}`}
          x={x}
          y={y}
          onToggle={onToggle}
          size={size}
          alive={cell}
        />
      ))}
    </div>
  );
}

interface CellProps {
  alive: boolean;
  x: number;
  y: number;
  size: number;
  onToggle(x: number, y: number): void;
}

function Cell(props: CellProps) {
  const { alive, x, y, size, onToggle } = props;
  return (
    <span
      className={`cell ${alive ? "cell-alive" : ""} ${
        size < SIZE_LIMIT ? "no-border" : ""
      }`}
      onClick={() => onToggle(x, y)}
      style={{ width: size, height: size }}
    ></span>
  );
}

export default Life;
