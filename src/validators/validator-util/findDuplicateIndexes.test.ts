import { findDuplicateIndexes } from "./findDuplicateIndexes";

describe("findDuplicateIndexes", () => {
  it("should return empty array for a valid set", () => {
    // arrange
    const set = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([]);
  });

  it("should return array with indexes for a set of duplicates - string[]", () => {
    // arrange
    const set = ["1", "2", "3", "4", "5", "6", "7", "8", "8"];

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([7, 8]);
  });

  it("should return array with indexes for multiple sets of duplicates - string[]", () => {
    // arrange
    const set = ["1", "1", "1", "4", "5", "6", "7", "8", "8"];

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([0, 1, 2, 7, 8]);
  });

  it("should return array with indexes for a set of duplicates - number[]", () => {
    // arrange
    const set = [1, 2, 3, 4, 5, 6, 7, 8, 8];

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([7, 8]);
  });

  it("should return array with indexes for multiple sets of duplicates - number[]", () => {
    // arrange
    const set = [1, 1, 1, 4, 5, 6, 7, 8, 8];

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([0, 1, 2, 7, 8]);
  });

  it("should return array with indexes for a set of duplicates - Uint8Array", () => {
    // arrange
    const set = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 8]);

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([7, 8]);
  });

  it("should return array with indexes for multiple sets of duplicates - Uint8Array", () => {
    // arrange
    const set = new Uint8Array([1, 1, 1, 4, 5, 6, 7, 8, 8]);

    // act
    const result = findDuplicateIndexes(set);

    // assert
    expect(result).toStrictEqual([0, 1, 2, 7, 8]);
  });
});
