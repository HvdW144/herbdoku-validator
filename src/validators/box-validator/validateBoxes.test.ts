import { validateBoxes } from "./validateBoxes";
import {
  VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4,
  VALID_DEFAULT_SUDOKU_UINT8ARRAY_9X9,
} from "../../util/test-util/sudokuStrings";

// Helper function to convert string to Uint8Array
function stringToUint8Array(str: string): Uint8Array {
  return new Uint8Array(str.split("").map((char) => parseInt(char)));
}

describe("validateBoxes", () => {
  it("should return empty array for a valid 4x4 grid", () => {
    // act
    const result = validateBoxes(VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4, 4);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const sudokuGrid = stringToUint8Array("1234341223414124");

    // act
    const result = validateBoxes(sudokuGrid, 4);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>([10, 15]));
  });

  it("should return empty array for a valid 9x9 grid", () => {
    // act
    const result = validateBoxes(VALID_DEFAULT_SUDOKU_UINT8ARRAY_9X9, 9);

    // assert
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
    expect(result.isValid).toBe(true);
  });

  it("should return array with duplicates for an invalid 9x9 grid", () => {
    // arrange
    const sudokuGrid = stringToUint8Array(
      "256473891974821536183569427691382754328754169547196283465237918732918645819645373",
    );

    // act
    const result = validateBoxes(sudokuGrid, 9);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>([78, 80]));
  });
});
