import { withStringInput } from "./withStringInput.util";
import type { IValidatorResult } from "../validators/validatorResult.interface";

describe("withStringInput", () => {
  // Create a simple test validator
  const testValidator = (
    grid: Uint8Array,
    gridSize: number,
  ): IValidatorResult => {
    return {
      isValid: grid.length === gridSize * gridSize,
      messages: [],
      invalidIndexes: new Set<number>(),
    };
  };

  const wrappedValidator = withStringInput(testValidator);

  it("should accept Uint8Array input and pass it through", () => {
    // arrange
    const grid = new Uint8Array([
      1, 2, 3, 4, 3, 4, 1, 2, 4, 3, 2, 1, 2, 1, 4, 3,
    ]);
    const gridSize = 4;

    // act
    const result = wrappedValidator(grid, gridSize, undefined);

    // assert
    expect(result.isValid).toBe(true);
  });

  it("should accept string input and convert it to Uint8Array", () => {
    // arrange
    const sudokuString = "1234341243212143";
    const gridSize = 4;

    // act
    const result = wrappedValidator(sudokuString, gridSize, undefined);

    // assert
    expect(result.isValid).toBe(true);
  });

  it("should throw error for string with incorrect length", () => {
    // arrange
    const sudokuString = "12345678";
    const gridSize = 4;

    // act & assert
    expect(() => wrappedValidator(sudokuString, gridSize, undefined)).toThrow(
      /Invalid string length. Expected 16 characters for a 4x4 grid, but got 8/,
    );
  });

  it("should throw error for Uint8Array with incorrect length", () => {
    // arrange
    const grid = new Uint8Array([1, 2, 3]);
    const gridSize = 4;

    // act & assert
    expect(() => wrappedValidator(grid, gridSize, undefined)).toThrow(
      /Invalid grid size. Expected 16 elements for a 4x4 grid, but got 3/,
    );
  });

  it("should pass options parameter to the wrapped validator", () => {
    // arrange
    const optionValidator = (
      grid: Uint8Array,
      gridSize: number,
      options?: { testOption: boolean },
    ): IValidatorResult => {
      return {
        isValid: options?.testOption ?? false,
        messages: [],
        invalidIndexes: new Set<number>(),
      };
    };

    const wrapped = withStringInput(optionValidator);
    const sudokuString = "1234341243212143";
    const gridSize = 4;
    const options = { testOption: true };

    // act
    const result = wrapped(sudokuString, gridSize, options);

    // assert
    expect(result.isValid).toBe(true);
  });
});
