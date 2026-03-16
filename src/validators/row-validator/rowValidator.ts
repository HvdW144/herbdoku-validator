import type { ValidatorResult } from "../validatorResult.interface";
import { findDuplicateIndexes } from "../validator-util/findDuplicateIndexes";
import type { ValidatorFunction } from "../../types/validator.type";

export const validateRows: ValidatorFunction = (
  grid: Uint8Array,
  gridSize: number,
): ValidatorResult => {
  const duplicateIndexes: Set<number> = new Set();
  for (let i = 0; i < gridSize; i++) {
    const rowStart = i * gridSize;
    const rowDuplicates = findDuplicateIndexes(grid, rowStart, gridSize);
    rowDuplicates.map((index) => {
      duplicateIndexes.add(rowStart + index);
    });
  }
  const isValid = duplicateIndexes.size === 0;

  return {
    isValid: isValid,
    messages: [],
    invalidIndexes: duplicateIndexes,
  };
};
