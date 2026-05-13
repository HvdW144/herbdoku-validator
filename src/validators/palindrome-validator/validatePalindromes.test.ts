import { VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4 } from "../../util/test-util/sudokuStrings";
import { validatePalindromes } from "./validatePalindromes";

describe("validatePalindromes", () => {
  it("should return empty array for a valid 4x4 grid", () => {
    // arrange
    const palindromes = [
      [13, 9, 4, 0],
      [15, 11, 6, 2],
    ];

    // act
    const result = validatePalindromes(
      VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4,
      4,
      palindromes,
    );

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const sudokuGrid = new Uint8Array([
      1, 2, 3, 4, 3, 4, 1, 2, 2, 3, 4, 2, 4, 1, 2, 4,
    ]);
    const palindromes = [
      [13, 9, 4, 0], // palindrome: 1-3-3-1
      [15, 11, 6, 2], // palindrome: 4-2-1-3
    ];

    // act
    const result = validatePalindromes(sudokuGrid, 4, palindromes);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(
      new Set<number>([15, 11, 6, 2]),
    );
  });

  it("should return empty array for a valid 9x9 grid", () => {
    // arrange
    const sudokuGrid = new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3, 4,
      5, 6, 2, 3, 4, 5, 6, 7, 8, 9, 1, 5, 6, 7, 8, 9, 1, 2, 3, 4, 8, 9, 1, 2, 3,
      4, 5, 6, 7, 3, 4, 5, 6, 7, 8, 9, 1, 2, 6, 7, 8, 9, 1, 2, 3, 4, 5, 9, 1, 2,
      3, 4, 5, 6, 7, 8,
    ]);
    const palindromes = [
      [28, 38, 48, 58, 49], // palindrome: 3-7-2-7-3
      [41, 51, 61], // palindrome: 1-5-1
    ];

    // act
    const result = validatePalindromes(sudokuGrid, 9, palindromes);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid 9x9 grid", () => {
    // arrange
    const sudokuGrid = new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3, 4,
      5, 6, 2, 3, 4, 5, 6, 7, 8, 9, 1, 5, 6, 7, 8, 9, 1, 2, 3, 4, 8, 9, 1, 2, 3,
      4, 5, 6, 7, 3, 4, 5, 6, 7, 8, 9, 1, 2, 6, 7, 8, 9, 1, 2, 3, 4, 5, 9, 1, 2,
      3, 4, 5, 6, 7, 8,
    ]);
    const palindromes = [
      [31, 40, 50, 60, 70], // palindrome: 6-9-5-9-4
      [75, 70], // palindrome: 3-4
    ];

    // act
    const result = validatePalindromes(sudokuGrid, 9, palindromes);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>([31, 70, 75]));
  });
});
