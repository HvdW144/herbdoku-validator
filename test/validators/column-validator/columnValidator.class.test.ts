import { ColumnValidator } from "../../../src/validators/column-validator/columnValidator.class";

describe("ColumnValidator", () => {
  it("validate - should return empty array for a valid 4x4 grid", () => {
    // arrange
    const columnValidator = new ColumnValidator();
    const sudokuString2D = [
      ["1", "2", "3", "4"],
      ["3", "4", "1", "2"],
      ["2", "3", "4", "1"],
      ["4", "1", "2", "3"],
    ];

    // act
    const result = columnValidator.validate(sudokuString2D, 4);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
  });

  it("validate - should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const columnValidator = new ColumnValidator();
    const sudokuString2D = [
      ["1", "2", "3", "4"],
      ["3", "4", "1", "2"],
      ["2", "3", "4", "1"],
      ["4", "1", "2", "4"],
    ];

    // act
    const result = columnValidator.validate(sudokuString2D, 4);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual([3, 15]);
  });

  it("validate - should return empty array for a valid 9x9 grid", () => {
    // arrange
    const columnValidator = new ColumnValidator();
    const sudokuString2D = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ["2", "3", "4", "5", "6", "7", "8", "9", "1"],
      ["3", "4", "5", "6", "7", "8", "9", "1", "2"],
      ["4", "5", "6", "7", "8", "9", "1", "2", "3"],
      ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
      ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
      ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
      ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
      ["9", "1", "2", "3", "4", "5", "6", "7", "8"],
    ];

    // act
    const result = columnValidator.validate(sudokuString2D, 9);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
  });

  it("validate - should return array with duplicates for an invalid 9x9 grid", () => {
    // arrange
    const columnValidator = new ColumnValidator();
    const sudokuString2D = [
      ["1", "3", "3", "4", "5", "6", "7", "8", "9"],
      ["2", "3", "4", "5", "6", "7", "8", "9", "1"],
      ["3", "4", "5", "6", "7", "8", "9", "1", "2"],
      ["4", "5", "6", "7", "8", "9", "1", "7", "3"],
      ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
      ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
      ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
      ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
      ["9", "1", "2", "3", "4", "5", "6", "7", "8"],
    ];

    // act
    const result = columnValidator.validate(sudokuString2D, 9);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual([1, 10, 34, 79]);
  });

  it("validate - should throw an error for an invalid grid size", () => {
    // arrange
    const columnValidator = new ColumnValidator();
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
    const act = () => columnValidator.validate(sudokuString2D, 9);

    // assert
    expect(act).toThrow("Invalid grid size for given string[][] size.");
  });
});
