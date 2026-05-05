import type {
  ValidatorFunction,
  ValidatorFunctionWrapper,
} from "../../types/validatorFunction.type";
import { withStringInput } from "../../util/withStringInput.util";
import type { IValidatorResult } from "../validatorResult.interface";

export const validatePalindromes: ValidatorFunction<number[][]> = (
  grid: Uint8Array,
  _: number,
  palindromes: number[][],
): IValidatorResult => {
  const duplicateIndexes: Set<number> = new Set();

  palindromes.forEach((palindrome) => {
    const len = palindrome.length;

    // going through only the first half
    for (let i = 0; i < len / 2; i++) {
      const startIndex = palindrome[i] as number;
      const endIndex = palindrome[len - 1 - i] as number;

      if (grid[startIndex] !== grid[endIndex]) {
        duplicateIndexes.add(startIndex);
        duplicateIndexes.add(endIndex);
      }
    }
  });

  return {
    isValid: duplicateIndexes.size === 0,
    messages: [],
    invalidIndexes: duplicateIndexes,
  };
};

export const validatePalindromesWrapper: ValidatorFunctionWrapper<number[][]> =
  withStringInput(validatePalindromes);
