/**
 * Converts a sudoku string to a Uint8Array
 * @param input - A string of digits (e.g., "123456789...")
 * @param gridSize - The size of the sudoku grid (e.g., 9 for 9x9)
 * @returns Uint8Array representation of the sudoku grid
 * @throws Error if string length doesn't match gridSize² or contains invalid characters
 */
export function stringToUint8Array(
  input: string,
  gridSize: number,
): Uint8Array {
  const expectedLength = gridSize * gridSize;

  if (input.length !== expectedLength) {
    throw new Error(
      `Invalid string length. Expected ${expectedLength} characters for a ${gridSize}x${gridSize} grid, but got ${input.length}.`,
    );
  }

  const result = new Uint8Array(expectedLength);
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const digit = charCode - 48; // '0' = 48 in ASCII

    if (digit < 0 || digit > 9) {
      throw new Error(
        `Invalid character at position ${i}: '${input[i]}'. Expected digit 0-9.`,
      );
    }

    result[i] = digit;
  }

  return result;
}
