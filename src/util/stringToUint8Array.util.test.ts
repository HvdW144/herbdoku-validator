import { stringToUint8Array } from "./stringToUint8Array.util";

describe("stringToUint8Array", () => {
  it("should convert a valid 9x9 sudoku string to Uint8Array", () => {
    // arrange
    const sudokuString =
      "256473891974821536183569427691382754328754169547196283465327918713948625819645372";
    // act
    const result = stringToUint8Array(sudokuString, 9);

    // assert
    expect(result.length).toBe(81);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(5);
    expect(result[80]).toBe(2);
  });

  it("should convert a valid 4x4 sudoku string to Uint8Array", () => {
    // arrange
    const sudokuString = "1234341243212143";
    const expectedArray = new Uint8Array([
      1, 2, 3, 4, 3, 4, 1, 2, 4, 3, 2, 1, 2, 1, 4, 3,
    ]);

    // act
    const result = stringToUint8Array(sudokuString, 4);

    // assert
    expect(result).toEqual(expectedArray);
  });

  it("should throw error for incorrect string length", () => {
    // arrange
    const sudokuString = "123456789"; // 9 chars, but for 9x9 we need 81
    const gridSize = 9;

    // act & assert
    expect(() => stringToUint8Array(sudokuString, gridSize)).toThrow(
      /Invalid string length. Expected 81 characters for a 9x9 grid, but got 9/,
    );
  });

  it("should throw error for invalid character", () => {
    // arrange
    // 81 char string with 'a' at position 2
    const sudokuString =
      "12a456789012345678901234567890123456789012345678901234567890123456789012345678901";
    const gridSize = 9;

    // act & assert
    expect(() => stringToUint8Array(sudokuString, gridSize)).toThrow(
      /Invalid character at position 2: 'a'. Expected digit 0-9/,
    );
  });

  it("should throw error for non-digit character", () => {
    // arrange
    // 81 char string with '!' at position 80
    const sudokuString =
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901";
    const modifiedString = sudokuString.substring(0, 80) + "!";
    const gridSize = 9;

    // act & assert
    expect(() => stringToUint8Array(modifiedString, gridSize)).toThrow(
      /Invalid character at position 80: '!'. Expected digit 0-9/,
    );
  });
});
