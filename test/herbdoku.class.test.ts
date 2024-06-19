import { ConcreteHerbdoku as Herbdoku } from "../src/herbdoku.class";
import type { ValidatorResultTotal } from "../src/validators/validatorResultTotal.interface";
import type { KropkiDot } from "../src/validators/kropki-validator/kropkiDot.interface";

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
    expect(buildMock).toHaveReturnedWith<ValidatorResultTotal>({
      isValid: true,
      messages: [],
      invalidIndexes: [],
    });
  });

  it("validateKropki - should call validateKropki and return empty array for valid sudokuString", () => {
    // arrange
    herbdoku = new Herbdoku("1234341221434321", 4);
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 10, x2: 9, kropkiValue: 3, kropkiType: "white" },
      { x1: 0, x2: 1, kropkiType: 1 },
    ];

    // act
    herbdoku.validateKropki(kropkiDotsArray);
    const validatorResultTotal = herbdoku.build();

    // assert
    expect(validatorResultTotal.isValid).toBe(true);
    expect(validatorResultTotal.messages).toStrictEqual([]);
    expect(validatorResultTotal.invalidIndexes).toStrictEqual([]);
  });
});
