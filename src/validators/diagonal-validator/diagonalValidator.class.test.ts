import {
  VALID_DEFAULT_SUDOKU_STRING_2D_4x4,
  VALID_DEFAULT_SUDOKU_STRING_2D_9x9,
} from "../../util/test-util/sudokuStrings";
import { DiagonalValidator } from "./diagonalValidator.class";

describe("DiagonalValidator", () => {
  it("validate - should return empty array for a valid 4x4 grid", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator();

    //act
    const result = diagonalValidator.validate(
      VALID_DEFAULT_SUDOKU_STRING_2D_4x4,
      4
    );

    //assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
  });

  it("validate - should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator();
    const sudokuString2D = [
      ["1", "2", "3", "4"],
      ["3", "4", "1", "2"],
      ["2", "3", "4", "1"],
      ["4", "1", "2", "3"],
    ];

    // act
    const result = diagonalValidator.validate(sudokuString2D, 4);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual([3, 5, 10, 12]);
  });

  it("validate - should return empty array for a valid main diagonal 9x9 grid", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator(true);

    // act
    const result = diagonalValidator.validate(
      VALID_DEFAULT_SUDOKU_STRING_2D_9x9,
      9
    );

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
  });

  it("validate - should return array with duplicates for an invalid anti diagonal 9x9 grid", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator(false, true);
    const sudokuString2D = [
      ["1", "3", "3", "4", "5", "6", "7", "8", "9"],
      ["2", "3", "4", "5", "6", "7", "8", "8", "1"],
      ["3", "4", "5", "6", "7", "8", "7", "1", "2"],
      ["4", "5", "6", "7", "8", "5", "1", "7", "3"],
      ["5", "6", "7", "8", "4", "1", "2", "3", "4"],
      ["6", "7", "8", "5", "1", "2", "3", "4", "5"],
      ["7", "8", "8", "1", "2", "3", "4", "5", "6"],
      ["8", "2", "1", "2", "3", "4", "5", "6", "7"],
      ["2", "1", "2", "3", "4", "5", "6", "7", "8"],
    ];

    // act
    const result = diagonalValidator.validate(sudokuString2D, 9);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual([16, 32, 48, 56, 64, 72]);
  });

  it("validate - should throw an error for an invalid grid size", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator();
    const sudokuString2D = [
      ["1", "3", "3", "4", "5", "6", "7", "8", "9"],
      ["2", "3", "4", "5", "6", "7", "8", "9", "1"],
      ["3", "4", "5", "6", "7", "8", "9", "1", "2"],
      ["4", "5", "6", "7", "8", "9", "1", "7", "3"],
      ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
      ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
      ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
      ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
    ];

    // act
    const act = () => diagonalValidator.validate(sudokuString2D, 9);

    // assert
    expect(act).toThrow("Invalid grid size for given string[][] size.");
  });
});
