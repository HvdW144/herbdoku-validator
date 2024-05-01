import { sudokuStringToStringArray } from "../../src/util/sudokuStringToStringArray.util";

describe("stringToStringArray", () => {
  it("should convert a valid Sudoku string of 81 characters (grid size 9) to an array", () => {
    // arrange
    const sudokuString =
      ".6.27.3..............5.8.9..7.1..........32...5.769...6........1...92.3..358.1..2";
    const gridSize = 9;

    const expectedArray = [
      [".", "6", ".", "2", "7", ".", "3", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "5", ".", "8", ".", "9", "."],
      [".", "7", ".", "1", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", "3", "2", ".", "."],
      [".", "5", ".", "7", "6", "9", ".", ".", "."],
      ["6", ".", ".", ".", ".", ".", ".", ".", "."],
      ["1", ".", ".", ".", "9", "2", ".", "3", "."],
      [".", "3", "5", "8", ".", "1", ".", ".", "2"],
    ];

    // act
    const result = sudokuStringToStringArray(sudokuString, gridSize);

    // assert
    expect(result).toEqual(expectedArray);
  });

  it("should throw an error for invalid string length", () => {
    // arrange
    const sudokuString = "...";
    const gridSize = 2;

    // act and assert
    expect(() => sudokuStringToStringArray(sudokuString, gridSize)).toThrow(
      "Invalid string length for given grid size."
    );
  });

  it("should convert a valid Sudoku string of 4 characters (grid size 2) to an array", () => {
    // arrange
    const sudokuString = ".6.2";
    const gridSize = 2;

    const expectedArray = [
      [".", "6"],
      [".", "2"],
    ];

    // act
    const result = sudokuStringToStringArray(sudokuString, gridSize);

    // assert
    expect(result).toEqual(expectedArray);
  });
});
