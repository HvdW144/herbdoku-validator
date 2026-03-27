import { ConcreteHerbdoku as Herbdoku } from "../src/herbdoku.class";
import type { KropkiDot } from "../src/validators/kropki-validator/kropkiDot.interface";
import type { Thermometer } from "../src/validators/thermo-validator/thermometer.interface";
import type { IValidatorResult } from "./validators/validatorResult.interface";

describe("Herbdoku", () => {
  let herbdoku: Herbdoku;

  it("default - should call rows, columns, and boxes", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const rowsMock = jest.spyOn(herbdoku, "rows");
    const columnsMock = jest.spyOn(herbdoku, "columns");
    const boxesMock = jest.spyOn(herbdoku, "boxes");

    // act
    herbdoku.default();

    // assert
    expect(rowsMock).toHaveBeenCalled();
    expect(columnsMock).toHaveBeenCalled();
    expect(boxesMock).toHaveBeenCalled();
  });

  it("build - should return the validatorResultTotal", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const buildMock = jest.spyOn(herbdoku, "build");

    // act
    herbdoku.build();

    // assert
    expect(buildMock).toHaveBeenCalled();
    expect(buildMock).toHaveReturnedWith<IValidatorResult>({
      isValid: true,
      messages: [],
      invalidIndexes: new Set<number>(),
    });
  });

  it("kropki - should call kropki and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 10, x2: 9, kropkiValue: 3, kropkiType: "white" }, // valid
      { x1: 0, x2: 1, kropkiType: 1 }, // valid
      { x1: 16, x2: 10, kropkiValue: 3, kropkiType: 0 }, // out-of-bounds
    ];

    // act
    herbdoku.kropki(kropkiDotsArray);
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

  it("thermos - should call thermos and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const thermoArray: Thermometer[] = [
      { indexes: [15, 14, 13] },
      { indexes: [14, 12], thermoDifference: 2 },
      { indexes: [9, 7, 2, 12] },
    ];
    // act
    herbdoku.thermos(thermoArray);
    const validatorResultTotal = herbdoku.build();

    // assert
    // expect(validatorResultTotal.isValid).toBe(true);
    expect(validatorResultTotal.messages).toStrictEqual([]);
    expect(validatorResultTotal.invalidIndexes).toStrictEqual(
      new Set<number>(),
    );
  });

  it("diagonals - should call diagonals and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341243212143", 4);
    const diagonalValidator = jest.spyOn(herbdoku, "diagonals");

    // act
    herbdoku.diagonals();

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
