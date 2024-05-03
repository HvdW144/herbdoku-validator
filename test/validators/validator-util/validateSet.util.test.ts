import { validateSetNoDoubles } from "../../../src/validators/validator-util/validateSet.util";

describe("validateSet", () => {
  it("validateSetNoDoubles - should return empty array for a valid set", () => {
    // arrange
    const set = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // act
    const result = validateSetNoDoubles(set);

    // assert
    expect(result).toStrictEqual([]);
  });

  it("validateSetNoDoubles - should return array with indexes for a set of duplicates", () => {
    // arrange
    const set = ["1", "2", "3", "4", "5", "6", "7", "8", "8"];

    // act
    const result = validateSetNoDoubles(set);

    // assert
    expect(result).toStrictEqual([7, 8]);
  });

  it("validateSetNoDoubles - should return array with indexes for multiple sets of duplicates", () => {
    // arrange
    const set = ["1", "1", "3", "4", "5", "6", "7", "8", "8"];

    // act
    const result = validateSetNoDoubles(set);

    // assert
    expect(result).toStrictEqual([0, 1, 7, 8]);
  });
});
