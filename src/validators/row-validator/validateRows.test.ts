import { validateRows } from "./validateRows";
import {
  VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4,
  VALID_DEFAULT_SUDOKU_UINT8ARRAY_9X9,
} from "../../util/test-util/sudokuStrings";

describe("validateRows", () => {
  it("should return empty array for a valid 4x4 grid", () => {
    // act
    const result = validateRows(VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4, 4);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const sudokuString2D = [
      ["1", "2", "3", "4"],
      ["3", "4", "1", "2"],
      ["2", "3", "4", "2"],
      ["4", "1", "2", "4"],
    ];
    const uint8Grid = stringGridToUint8Array(sudokuString2D);

    // act
    const result = validateRows(uint8Grid, 4);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(
      new Set<number>([8, 11, 12, 15]),
    );
  });

  it("should return empty array for a valid 9x9 grid", () => {
    // act
    const result = validateRows(VALID_DEFAULT_SUDOKU_UINT8ARRAY_9X9, 9);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid 9x9 grid", () => {
    // arrange
    const sudokuString2D = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ["3", "4", "1", "2", "5", "6", "7", "8", "9"],
      ["2", "3", "4", "1", "5", "6", "7", "8", "9"],
      ["4", "1", "2", "3", "5", "6", "7", "8", "9"],
      ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
      ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
      ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
      ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
      ["9", "1", "2", "3", "4", "5", "6", "7", "9"],
    ];
    const uint8Grid = stringGridToUint8Array(sudokuString2D);

    // act
    const result = validateRows(uint8Grid, 9);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>([72, 80]));
  });
});

// Helper to convert 2D string arrays to Uint8Array
function stringGridToUint8Array(grid: string[][]): Uint8Array {
  return new Uint8Array(
    grid
      .map((row) => row.join(""))
      .join("")
      .split("")
      .map((char) => parseInt(char, 10)),
  );
}
