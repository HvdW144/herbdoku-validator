import { DiagonalValidator } from "./diagonalValidator.class";

describe("DiagonalValidator", () => {
  it("validate - should return empty array for a valid 4x4 grid", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator();
    const sudokuString2D: string[][] = [
      ["1", "2", "3", "4"],
      ["5", "6", "7", "8"],
      ["1", "2", "5", "4"],
      ["5", "6", "7", "8"],
    ];

    //act
    const result = diagonalValidator.validate(sudokuString2D, 4);

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
});
