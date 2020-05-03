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
    <table className={`life ${size < SIZE_LIMIT ? "life-border" : ""}`}>
      <tbody>
        {population.map((row, y) => (
          <OptimizedRow
            key={y}
            row={row}
            y={y}
            size={size}
            onToggle={onToggle}
          />
        ))}
      </tbody>
    </table>
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
    <tr key={y}>
      {row.map((cell, x) => (
        <td
          key={`${y}${x}`}
          className={`cell ${!!cell ? "cell-alive" : ""} ${
            size < SIZE_LIMIT ? "no-border" : ""
          }`}
          onClick={() => onToggle(x, y)}
          style={{ width: size, height: size }}
        ></td>
      ))}
    </tr>
  );
}

export default Life;
