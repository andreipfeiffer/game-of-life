import { Preset } from "./types";

export function getPresets(): Preset[] {
  return [
    {
      id: "block",
      description: "Block (Still lifes)",
      width: 4,
      height: 4,
      grid: [
        [false, false, false, false],
        [false, true, true, false],
        [false, true, true, false],
        [false, false, false, false],
      ],
    },
    {
      id: "blinker",
      description: "Blinker (period 2 Oscillator)",
      width: 5,
      height: 5,
      grid: [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
    },
    {
      id: "toad",
      description: "Toad (period 2 oscillator)",
      width: 6,
      height: 6,
      grid: [
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, true, true, true, false],
        [false, true, true, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ],
    },
    {
      id: "glider",
      description: "Glider (Spaceship)",
      width: 5,
      height: 5,
      grid: [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, false, true, false],
        [false, true, true, true, false],
        [false, false, false, false, false],
      ],
    },
  ];
}
