import {
  getInitialState,
  getStringGrid,
  getNextPopulation,
  getNeighbors,
} from "./utils";

describe("getInitialState()", () => {
  it("should return same size, when width and height match", () => {
    expect(getInitialState([[1]], 1, 1)).toEqual([[true]]);
  });

  it("should return passed size, when width and height are greater", () => {
    expect(getInitialState([[1]], 2, 2)).toEqual([
      [true, false],
      [false, false],
    ]);
  });
});

describe("getStringGrid()", () => {
  it("should return 1/1 true", () => {
    expect(getStringGrid([[true]])).toEqual(`x`);
  });
  it("should return 1/1 false", () => {
    expect(getStringGrid([[false]])).toEqual(` `);
  });
  it("should return 2/2 false,true/true,false", () => {
    expect(
      getStringGrid([
        [false, true],
        [true, false],
      ])
    ).toEqual(` x
x `);
  });
});

describe("getNextPopulation()", () => {
  it("should not do anything when all cells are dead", () => {
    expect(
      getNextPopulation([
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ])
    ).toEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]);
  });

  it("should kill all cells if no cell has less than 2 neighbors", () => {
    expect(
      getNextPopulation([
        [true, true, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ])
    ).toEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]);
  });

  it("should leave the population untouched, for the 'block' input", () => {
    // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#/media/File:Game_of_life_block_with_border.svg
    expect(
      getNextPopulation([
        [false, false, false, false],
        [false, true, true, false],
        [false, true, true, false],
        [false, false, false, false],
      ])
    ).toEqual([
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ]);
  });

  it("should leave the population untouched, for the 'beehive' input", () => {
    // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#/media/File:Game_of_life_beehive.svg
    expect(
      getNextPopulation([
        [false, false, false, false, false, false],
        [false, false, true, true, false, false],
        [false, true, false, false, true, false],
        [false, false, true, true, false, false],
        [false, false, false, false, false, false],
      ])
    ).toEqual([
      [false, false, false, false, false, false],
      [false, false, true, true, false, false],
      [false, true, false, false, true, false],
      [false, false, true, true, false, false],
      [false, false, false, false, false, false],
    ]);
  });

  it("should update population, for the 'blinker oscillator' input", () => {
    // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#/media/File:Game_of_life_blinker.gif
    expect(
      getNextPopulation([
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
      ])
    ).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]);

    // vice-versa
    expect(
      getNextPopulation([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ])
    ).toEqual([
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ]);
  });
});

describe("getNeighbors()", () => {
  it("should get all 8 neighbors, when element is not a the edge", () => {
    expect(
      getNeighbors(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        // 5
        1,
        1
      )
    ).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
  });
  it("should get all 8 neighbors, when element is top-left", () => {
    expect(
      getNeighbors(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        // 1
        0,
        0
      )
    ).toEqual([9, 7, 8, 3, 2, 6, 4, 5]);
  });
  it("should get all 8 neighbors, when element is bottom-right", () => {
    expect(
      getNeighbors(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        // 9
        2,
        2
      )
    ).toEqual([5, 6, 4, 8, 7, 2, 3, 1]);
  });
});
