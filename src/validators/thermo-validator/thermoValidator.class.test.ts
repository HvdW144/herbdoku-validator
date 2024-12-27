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
        indexes: [6, 19, 12],
        thermoDifference: 0,
      },
    ];
    const rowValidator = new ThermoValidator(thermoArray);
    const sudokuString =
      "256473891974821536183569427691382754328754169547196283465237918732918645819645372";

    // act
    const result = rowValidator.validate(sudokuString);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.invalidIndexes).toStrictEqual([]);
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
    const thermoValidator = new ThermoValidator(thermoArray);
    const sudokuString =
      "256473891974821536183569427691382754328754169547196283465237918732918645819645372";

    // act
    const result = thermoValidator.validate(sudokuString);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.invalidIndexes).toStrictEqual([69, 11]);
  });
});
