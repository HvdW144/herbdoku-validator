import { VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4 } from "../../util/test-util/sudokuStrings";
import { validateDiagonals } from "./diagonalValidator.class";

describe("validateDiagonals", () => {
  it("should return empty array for a valid 4x4 grid", () => {
    //act
    const result = validateDiagonals(VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4, 4, {
      main: true,
      anti: true,
    });

    //assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const grid = new Uint8Array([
      1, 2, 3, 4, 3, 4, 1, 2, 2, 3, 4, 1, 4, 1, 2, 3,
    ]);

    // act
    const result = validateDiagonals(grid, 4, {
      main: true,
      anti: true,
    });

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(
      new Set<number>([3, 5, 10, 12]),
    );
  });

  it("should return empty array for a valid main diagonal 9x9 grid", () => {
    // arrange
    const grid = new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 4, 5, 6, 7, 8, 9, 1, 2, 3, 5, 6, 7, 8, 9, 1, 2, 3, 4, 6, 7, 8, 9, 1,
      2, 3, 4, 5, 7, 8, 9, 1, 2, 3, 4, 5, 6, 8, 9, 1, 2, 3, 4, 5, 6, 7, 9, 1, 2,
      3, 4, 5, 6, 7, 8,
    ]);

    // act
    const result = validateDiagonals(grid, 9, {
      main: true,
      anti: false,
    });

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("should return array with duplicates for an invalid anti diagonal 9x9 grid", () => {
    // arrange
    const grid = new Uint8Array([
      1, 3, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 8, 1, 3, 4, 5, 6, 7, 8, 7,
      1, 2, 4, 5, 6, 7, 8, 5, 1, 7, 3, 5, 6, 7, 8, 4, 1, 2, 3, 4, 6, 7, 8, 5, 1,
      2, 3, 4, 5, 7, 8, 8, 1, 2, 3, 4, 5, 6, 8, 2, 1, 2, 3, 4, 5, 6, 7, 2, 1, 2,
      3, 4, 5, 6, 7, 8,
    ]);

    // act
    const result = validateDiagonals(grid, 9, {
      main: false,
      anti: true,
    });

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(
      new Set<number>([16, 32, 48, 56, 64, 72]),
    );
  });
});
