import { ConcreteHerbdoku as Herbdoku } from "../src/herbdoku.class";
import type { KropkiDot } from "../src/validators/kropki-validator/kropkiDot.interface";
import type { Thermometer } from "../src/validators/thermo-validator/thermometer.interface";
import type { ValidatorResult } from "./validators/validatorResult.interface";

describe("Herbdoku", () => {
  let herbdoku: Herbdoku;

  it("validateDefault - should call validateRows, validateColumns, and validateBoxes", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const validateRowsMock = jest.spyOn(herbdoku, "validateRows");
    const validateColumnsMock = jest.spyOn(herbdoku, "validateColumns");
    const validateBoxesMock = jest.spyOn(herbdoku, "validateBoxes");

    // act
    herbdoku.validateDefault();

    // assert
    expect(validateRowsMock).toHaveBeenCalled();
    expect(validateColumnsMock).toHaveBeenCalled();
    expect(validateBoxesMock).toHaveBeenCalled();
  });

  it("build - should return the validatorResultTotal", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const buildMock = jest.spyOn(herbdoku, "build");

    // act
    herbdoku.build();

    // assert
    expect(buildMock).toHaveBeenCalled();
    expect(buildMock).toHaveReturnedWith<ValidatorResult>({
      isValid: true,
      messages: [],
      invalidIndexes: new Set<number>(),
    });
  });

  it("validateKropki - should call validateKropki and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 10, x2: 9, kropkiValue: 3, kropkiType: "white" }, // valid
      { x1: 0, x2: 1, kropkiType: 1 }, // valid
      { x1: 16, x2: 10, kropkiValue: 3, kropkiType: 0 }, // out-of-bounds
    ];

    // act
    herbdoku.validateKropki(kropkiDotsArray);
    const validatorResultTotal = herbdoku.build();

    // assert
    expect(validatorResultTotal.isValid).toBe(true);
    expect(validatorResultTotal.messages).toStrictEqual([
      "One or more indexes of the kropki dot with indexes 16 and 10 are out of bounds. Result is ignored",
    ]);
    expect(validatorResultTotal.invalidIndexes).toStrictEqual(
      new Set<number>(),
    );
  });

  it("validateThermos - should call validateThermos and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const thermoArray: Thermometer[] = [
      { indexes: [15, 14, 13] },
      { indexes: [14, 12], thermoDifference: 2 },
      { indexes: [9, 7, 2, 12] },
    ];
    // act
    herbdoku.validateThermos(thermoArray);
    const validatorResultTotal = herbdoku.build();

    // assert
    // expect(validatorResultTotal.isValid).toBe(true);
    expect(validatorResultTotal.messages).toStrictEqual([]);
    expect(validatorResultTotal.invalidIndexes).toStrictEqual(
      new Set<number>(),
    );
  });

  it("validateDiagonals - should call validateDiagonals and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341243212143", 4);
    const diagonalValidator = jest.spyOn(herbdoku, "validateDiagonals");

    // act
    herbdoku.validateDiagonals();

    // assert
    expect(diagonalValidator).toHaveBeenCalled();
    const validatorResultTotal = herbdoku.build();
    expect(validatorResultTotal.isValid).toBe(true);
    expect(validatorResultTotal.messages).toStrictEqual([]);
    expect(validatorResultTotal.invalidIndexes).toStrictEqual(
      new Set<number>(),
    );
  });

  it("constructor - should throw an error for an invalid grid size", () => {
    // arrange
    const sudokuString = "12342341123";

    // act
    const act = () => new Herbdoku(sudokuString, 4);

    // assert
    expect(act).toThrow("Invalid grid size for given sudokuString length.");
  });
});
