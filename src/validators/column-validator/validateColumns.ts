import { findDuplicateIndexes } from "../validator-util/findDuplicateIndexes";
import type {
  ValidatorFunctionWrapper,
  ValidatorFunction,
} from "../../types/validatorFunction.type";
import { withStringInput } from "../../util/withStringInput.util";

export const validateColumns: ValidatorFunction = (
  grid: Uint8Array,
  gridSize: number,
) => {
  const duplicateIndexes: Set<number> = new Set();
  for (let i = 0; i < gridSize; i++) {
    const column = grid.map(
      (_, rowIndex) => grid[rowIndex * gridSize + i] || 0,
    );
    const columnDuplicates = findDuplicateIndexes(column);
    columnDuplicates.map((index) => {
      duplicateIndexes.add(i + index * gridSize);
    });
  }
  const isValid = duplicateIndexes.size === 0;

  return {
    isValid: isValid,
    messages: [],
    invalidIndexes: duplicateIndexes,
  };
};

export const validateColumnsWrapper: ValidatorFunctionWrapper =
  withStringInput(validateColumns);
