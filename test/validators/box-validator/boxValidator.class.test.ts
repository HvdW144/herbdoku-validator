import { BoxValidator } from "../../../src/validators/box-validator/boxValidator.class";

describe("BoxValidator", () => {
  it("validate - should return empty array for a valid 4x4 grid", () => {
    // arrange
    const boxValidator = new BoxValidator();
    const sudokuString = "1234341223414123";

    // act
    const result = boxValidator.validate(sudokuString, 4);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.duplicates).toStrictEqual([]);
  });

  it("validate - should return array with duplicates for an invalid 4x4 grid", () => {
    // arrange
    const boxValidator = new BoxValidator();
    const sudokuString = "1234341223414124";

    // act
    const result = boxValidator.validate(sudokuString, 4);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.duplicates).toStrictEqual([10, 15]);
  });

  it("validate - should return empty array for a valid 9x9 grid", () => {
    // arrange
    const boxValidator = new BoxValidator();
    const sudokuString =
      "256473891974821536183569427691382754328754169547196283465237918732918645819645372";

    // act
    const result = boxValidator.validate(sudokuString, 9);

    // assert
    expect(result.duplicates).toStrictEqual([]);
    expect(result.isValid).toBe(true);
  });

  it("validate - should return array with duplicates for an invalid 9x9 grid", () => {
    // arrange
    const boxValidator = new BoxValidator();
    const sudokuString =
      "256473891974821536183569427691382754328754169547196283465237918732918645819645373";

    // act
    const result = boxValidator.validate(sudokuString, 9);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.duplicates).toStrictEqual([78, 80]);
  });

  it("validate - should throw an error for an invalid grid size", () => {
    // arrange
    const boxValidator = new BoxValidator();
    const sudokuString = "12342341123";

    // act
    const act = () => boxValidator.validate(sudokuString, 4);

    // assert
    expect(act).toThrow("Invalid grid size for given string size.");
  });
});
