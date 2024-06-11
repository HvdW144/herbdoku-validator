export function sudokuStringToStringArray(
  sudokuString: string,
  gridSize: number
): string[][] {
  if (sudokuString.length !== gridSize ** 2) {
    throw new Error("Invalid string length for given grid size.");
  }

  const Array1D = Array.from(sudokuString);

  const Array2D: string[][] = [];
  for (let i = 0; i < gridSize; i++) {
    Array2D.push(Array1D.slice(i * gridSize, (i + 1) * gridSize));
  }

  return Array2D;
}
