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
        <span
          key={`${y}${x}`}
          className={`cell ${!!cell ? "cell-alive" : ""} ${
            size < SIZE_LIMIT ? "no-border" : ""
          }`}
          onClick={() => onToggle(x, y)}
          style={{ width: size, height: size }}
        ></span>
      ))}
    </div>
  );
}

export default Life;
