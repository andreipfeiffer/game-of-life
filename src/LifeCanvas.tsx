import React, { useRef, useEffect } from "react";
import { Grid } from "./types";
import "./LifeCanvas.css";

interface Props {
  population: Grid;
  size: number;
}

function LifeCanvas(props: Props) {
  const { population, size } = props;
  const height = population.length;
  const width = population[0].length;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width * size, height * size);

    ctx.fillStyle = "black";
    for (let row = 0; row < population.length; row += 1) {
      for (let col = 0; col < population[row].length; col += 1) {
        const cell = population[row][col];
        cell && ctx.fillRect(col * size, row * size, size, size);
      }
    }
    // width & height depend on population, so no need to add them here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, population]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      width={width * size}
      height={height * size}
    ></canvas>
  );
}

export default LifeCanvas;
