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

  it("validateSetNoDoubles - should return array with indexes for a set with duplicates", () => {
    // arrange
    const set = ["1", "2", "3", "4", "5", "6", "7", "8", "8"];

    // act
    const result = validateSetNoDoubles(set);

    // assert
    console.log(result);
    expect(result).toStrictEqual(["7", "8"]);
  });

  // it("validateSetNoDoubles - should return true for a set with zeros", () => {
  //     // arrange
  //     const set = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  //     // act
  //     const result = validateSetNoDoubles(set);

  //     // assert
  //     expect(result).toBe(true);
  // });

  // it("validateSetNoDoubles - should return true for an empty set", () => {
  //     // arrange
  //     const set: number[] = [];

  //     // act
  //     const result = validateSetNoDoubles(set);

  //     // assert
  //     expect(result).toBe(true);
});
