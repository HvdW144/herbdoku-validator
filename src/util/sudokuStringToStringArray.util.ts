export function sudokuStringToStringArray(
  sudokuString: string,
  gridSize: number
): string[] {
  if (sudokuString.length !== gridSize ** 2) {
    throw new Error("Invalid string length for given grid size.");
  }

  const sudokuArray: string[] = [];
  for (let i = 0; i < gridSize; i++) {
    const row = sudokuString.slice(i * gridSize, i * gridSize + gridSize);
    sudokuArray.push(row);
  }
  return sudokuArray;
}
