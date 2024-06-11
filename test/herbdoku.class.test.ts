import { ConcreteHerbdoku as Herbdoku } from "../src/herbdoku.class";
import type { ValidatorResultTotal } from "../src/validators/validatorResultTotal.interface";

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
      duplicates: [],
    });
  });
});
