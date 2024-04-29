import { sudokuStringToStringArray } from "../../src/util/sudokuStringToStringArray.util";

describe("stringToStringArray", () => {
  it("should convert a valid Sudoku string of 81 characters (grid size 9) to an array", () => {
    const sudokuString =
      ".6.27.3..............5.8.9..7.1..........32...5.769...6........1...92.3..358.1..2";
    const gridSize = 9;

    // if anyone has a better way to write this, please let me know -HvdW144
    const expectedArray = [
      ".",
      "6",
      ".",
      "2",
      "7",
      ".",
      "3",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "5",
      ".",
      "8",
      ".",
      "9",
      ".",
      ".",
      "7",
      ".",
      "1",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "3",
      "2",
      ".",
      ".",
      ".",
      "5",
      ".",
      "7",
      "6",
      "9",
      ".",
      ".",
      ".",
      "6",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "1",
      ".",
      ".",
      ".",
      "9",
      "2",
      ".",
      "3",
      ".",
      ".",
      "3",
      "5",
      "8",
      ".",
      "1",
      ".",
      ".",
      "2",
    ];

    const result = sudokuStringToStringArray(sudokuString, gridSize);
    expect(result).toEqual(expectedArray);
  });

  it("should throw an error for invalid string length", () => {
    const sudokuString = "...";
    const gridSize = 2;

    expect(() => sudokuStringToStringArray(sudokuString, gridSize)).toThrow(
      "Invalid string length for given grid size."
    );
  });
});
