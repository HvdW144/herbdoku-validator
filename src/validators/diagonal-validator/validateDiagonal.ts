import type { IValidatorResult } from "../validatorResult.interface";
import { findDuplicateIndexes } from "../validator-util/findDuplicateIndexes";
import type { ValidatorFunction } from "../../types/validatorFunction.type";

export const validateDiagonals: ValidatorFunction<{
  main?: boolean;
  anti?: boolean;
}> = (
  grid: Uint8Array,
  gridSize: number,
  options?: { main?: boolean; anti?: boolean },
): IValidatorResult => {
  const mainCheck = options?.main ?? true;
  const antiCheck = options?.anti ?? true;

  const duplicateIndexes: Set<number> = new Set();

  if (mainCheck) {
    const mainValues: Uint8Array = new Uint8Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
      mainValues[i] = grid[i * gridSize + i] as number;
    }
    const mainDuplicates = findDuplicateIndexes(mainValues, 0, gridSize);
    mainDuplicates.map((index) => {
      duplicateIndexes.add(index * gridSize + index);
    });
  }

  if (antiCheck) {
    const antiValues: Uint8Array = new Uint8Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
      antiValues[i] = grid[i * gridSize + (gridSize - 1 - i)] as number;
    }
    const antiDuplicates = findDuplicateIndexes(antiValues, 0, gridSize);
    antiDuplicates.map((index) => {
      duplicateIndexes.add(index * gridSize + (gridSize - 1 - index));
    });
  }
  const isValid = duplicateIndexes.size === 0;

  return {
    isValid: isValid,
    messages: [],
    invalidIndexes: duplicateIndexes,
  };
};
