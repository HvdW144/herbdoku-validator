import { validateThermosWrapper } from "./validateThermos";
import type { Thermometer } from "./thermometer.interface";
import {
  VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4,
  VALID_DEFAULT_SUDOKU_UINT8ARRAY_9X9,
} from "../../util/test-util/sudokuStrings";

describe("ThermoValidator", () => {
  it("validate - should return empty array for a valid normal thermo", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [0, 1, 2, 3],
      },
    ];

    // act
    const result = validateThermosWrapper(
      VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4,
      4,
      thermoArray,
    );

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("validate - should return empty array for an invalid normal thermo", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [0, 1, 2, 3, 4],
      },
    ];
    const sudokuGrid = new Uint8Array([
      1, 2, 3, 4, 2, 4, 1, 2, 2, 3, 4, 1, 4, 1, 2, 3,
    ]);

    // act
    const result = validateThermosWrapper(sudokuGrid, 4, thermoArray);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>([4]));
  });

  it("validate - should return empty array for a valid 9x9 grid", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [70, 69, 68],
        thermoDifference: 2,
      },
      {
        indexes: [6, 19, 12],
        thermoDifference: 0,
      },
    ];

    // act
    const result = validateThermosWrapper(
      VALID_DEFAULT_SUDOKU_UINT8ARRAY_9X9,
      9,
      thermoArray,
    );

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("validate - should return array with duplicates for an invalid 9x9 grid", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [70, 69, 66],
        thermoDifference: 3,
      },
      {
        indexes: [6, 19, 11],
        thermoDifference: 0,
      },
    ];
    const sudokuGrid = new Uint8Array([
      2, 5, 6, 4, 7, 3, 8, 9, 1, 9, 7, 4, 8, 2, 1, 5, 3, 6, 1, 8, 3, 5, 6, 9, 4,
      2, 7, 6, 9, 1, 3, 8, 2, 7, 5, 4, 3, 2, 8, 7, 5, 4, 1, 6, 9, 5, 4, 7, 1, 9,
      6, 2, 8, 3, 4, 6, 5, 2, 3, 7, 9, 1, 8, 7, 3, 2, 9, 1, 8, 6, 4, 5, 8, 1, 9,
      6, 4, 5, 3, 7, 2,
    ]);

    // act
    const result = validateThermosWrapper(sudokuGrid, 9, thermoArray);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>([69, 11]));
  });
});
