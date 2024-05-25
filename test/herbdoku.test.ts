import Herbdoku from "../src/herbdoku";

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
});
