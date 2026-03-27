import { validateKropki } from "./validateKropki";
import type { KropkiDot } from "./kropkiDot.interface";
import { VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4 } from "../../util/test-util/sudokuStrings";

describe("KropkiValidator", () => {
  it("validate - should return empty array for a valid 4x4 grid with 2 default white kropki dots", () => {
    // arrange
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 0, x2: 1, kropkiType: "white" },
      { x1: 3, x2: 4, kropkiType: 0 },
    ];

    // act
    const result = validateKropki(
      VALID_DEFAULT_SUDOKU_UINT8ARRAY_4X4,
      4,
      kropkiDotsArray,
    );

    // assert
    expect(result.isValid).toBe(true);
    expect(result.messages).toStrictEqual([]);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("validate - should return empty array for a valid 4x4 grid with 2 default black kropki dots", () => {
    // arrange
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 0, x2: 1, kropkiType: "black" },
      { x1: 2, x2: 3, kropkiType: 1 },
    ];
    const grid = new Uint8Array([
      1, 2, 4, 2, 3, 4, 1, 2, 2, 3, 4, 1, 4, 1, 2, 3,
    ]);

    // act
    const result = validateKropki(grid, 4, kropkiDotsArray);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.messages).toStrictEqual([]);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });

  it("validate - should return array with duplicates for a valid 4x4 grid with 1 white and 2 black kropki dots", () => {
    // arrange
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 3, x2: 4, kropkiValue: 3, kropkiType: 0 }, // invalid
      { x1: 10, x2: 9, kropkiValue: 3, kropkiType: "black" }, // valid
      { x1: 13, x2: 14, kropkiValue: 3, kropkiType: 1 }, // invalid
    ];
    const grid = new Uint8Array([
      1, 2, 4, 2, 3, 4, 1, 2, 2, 3, 1, 4, 4, 1, 2, 3,
    ]);

    // act
    const result = validateKropki(grid, 4, kropkiDotsArray);

    // assert
    expect(result.isValid).toBe(false);
    expect(result.messages).toStrictEqual([]);
    expect(result.invalidIndexes).toStrictEqual(
      new Set<number>([3, 4, 13, 14]),
    );
  });

  it("validate - should return a warning message for a out-of-bounds index", () => {
    // arrange
    const kropkiDotsArray: KropkiDot[] = [
      { x1: 13, x2: 16, kropkiType: "white" },
    ];
    const grid = new Uint8Array([
      1, 2, 4, 2, 3, 4, 1, 2, 2, 3, 4, 1, 4, 1, 2, 3,
    ]);

    // act
    const result = validateKropki(grid, 4, kropkiDotsArray);

    // assert
    expect(result.isValid).toBe(true);
    expect(result.messages).toStrictEqual([
      "One or more indexes of the kropki dot with indexes 13 and 16 are out of bounds. Result is ignored",
    ]);
    expect(result.invalidIndexes).toStrictEqual(new Set<number>());
  });
});
