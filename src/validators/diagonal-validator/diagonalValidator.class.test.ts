import { DiagonalValidator } from "./diagonalValidator.class";

describe("DiagonalValidator", () => {
  it("validate - should return empty array for a valid 4x4 grid", () => {
    // arrange
    const diagonalValidator = new DiagonalValidator();
    const sudokuString2D: string[][] = [
      ["1", "2", "3", "4"],
      ["5", "6", "7", "8"],
      ["1", "2", "1", "4"],
      ["5", "6", "7", "8"],
    ];
    diagonalValidator.validate(sudokuString2D, 4);
    fail("Diagonal validation is not implemented yet");
  });
});
