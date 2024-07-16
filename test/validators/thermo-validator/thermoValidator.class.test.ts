import { ThermoValidator } from "../../../src/validators/thermo-validator/thermoValidator.class";
import type { Thermometer } from "../../../src/validators/thermo-validator/thermometer.interface";

describe("ThermoValidator", () => {
  it("validate - should return empty array for a valid normal thermo", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [0, 1, 2, 3],
      },
    ];
    const thermoValidator = new ThermoValidator(thermoArray);
    const sudokuString = "1234341223414123";

    // act
    const result = thermoValidator.validate(sudokuString);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
  });

  it("validate - should return empty array for an invalid normal thermo", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [0, 1, 2, 3, 4],
      },
    ];
    const thermoValidator = new ThermoValidator(thermoArray);
    const sudokuString = "1234241223414123";

    // act
    const result = thermoValidator.validate(sudokuString);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual([4]);
  });

  it("validate - should return empty array for a valid 9x9 grid", () => {
    // arrange
    const thermoArray: Thermometer[] = [
      {
        indexes: [70, 69, 68],
        thermoDifference: 2,
      },
      {
        indexes: [6, 12, 7],
        thermoDifference: 0,
      },
    ];
    const rowValidator = new ThermoValidator(thermoArray);
    const sudokuString =
      "256473891974821536183569427691382754328754169547196283465237918732918645819645372";

    // act
    const result = rowValidator.validate(sudokuString);

    // assert
    // expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
  });

  //   it("validate - should return array with duplicates for an invalid 9x9 grid", () => {
  //     // arrange
  //     const rowValidator = new ThermoValidator();
  //     const sudokuString2D = [
  //       ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  //       ["3", "4", "1", "2", "5", "6", "7", "8", "9"],
  //       ["2", "3", "4", "1", "5", "6", "7", "8", "9"],
  //       ["4", "1", "2", "3", "5", "6", "7", "8", "9"],
  //       ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
  //       ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
  //       ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
  //       ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
  //       ["9", "1", "2", "3", "4", "5", "6", "7", "9"],
  //     ];

  //     // act
  //     const result = rowValidator.validate(sudokuString2D, 9);

  //     // assert
  //     expect(result.isValid).toBe(false);
  //     expect(result.invalidIndexes).toStrictEqual([72, 80]);
  //   });

  //   it("validate - should throw an error for an invalid grid size", () => {
  //     // arrange
  //     const rowValidator = new ThermoValidator();
  //     const sudokuString2D = [
  //       ["1", "3", "3", "4", "5", "6", "7", "8", "9"],
  //       ["2", "3", "4", "5", "6", "7", "8", "9", "1"],
  //       ["3", "4", "5", "6", "7", "8", "9", "1", "2"],
  //       ["4", "5", "6", "7", "8", "9", "1", "7", "3"],
  //       ["5", "6", "7", "8", "9", "1", "2", "3", "4"],
  //       ["6", "7", "8", "9", "1", "2", "3", "4", "5"],
  //       ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
  //       ["8", "9", "1", "2", "3", "4", "5", "6", "7"],
  //     ];

  //     // act
  //     const act = () => rowValidator.validate(sudokuString2D, 9);

  //     // assert
  //     expect(act).toThrow("Invalid grid size for given string[][] size.");
  //   });
});
