import type { IValidatorResult } from "../validatorResult.interface";
import { findDuplicateIndexes } from "../validator-util/findDuplicateIndexes";
import type {
  ValidatorFunctionWrapper,
  ValidatorFunction,
} from "../../types/validatorFunction.type";
import { withStringInput } from "../../util/withStringInput.util";

export const validateRows: ValidatorFunction = (
  grid: Uint8Array,
  gridSize: number,
): IValidatorResult => {
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

export const validateRowsWrapper: ValidatorFunctionWrapper =
  withStringInput(validateRows);
