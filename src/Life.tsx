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

  const style = { "--size": `${size}px` } as React.CSSProperties;

  return (
    <div
      className={`life ${size < SIZE_LIMIT ? "small-size" : ""}`}
      style={style}
    >
      {population.map((row, y) => (
        <OptimizedRow key={y} row={row} y={y} onToggle={onToggle} />
      ))}
    </div>
  );
}

interface RowProps {
  row: Array<boolean>;
  y: number;
  onToggle(x: number, y: number): void;
}

function Row(props: RowProps) {
  const { y, row, onToggle } = props;
  return (
    <div key={y} className="row">
      {row.map((cell, x) => (
        <OptimizedCell
          key={`${y}${x}`}
          x={x}
          y={y}
          onToggle={onToggle}
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
  onToggle(x: number, y: number): void;
}

function Cell(props: CellProps) {
  const { alive, x, y, onToggle } = props;
  return (
    <span
      className={`cell ${alive ? "cell-alive" : ""}`}
      onClick={() => onToggle(x, y)}
    ></span>
  );
}

export default Life;
