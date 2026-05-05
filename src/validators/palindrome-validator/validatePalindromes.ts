import type {
  ValidatorFunction,
  ValidatorFunctionWrapper,
} from "../../types/validatorFunction.type";
import { withStringInput } from "../../util/withStringInput.util";
import type { IValidatorResult } from "../validatorResult.interface";

export const validatePalindromes: ValidatorFunction<number[][]> = (
  grid: Uint8Array,
  gridSize: number,
  options: number[][],
): IValidatorResult => {
  throw Error("not implemented");
};

export const validatePalindromesWrapper: ValidatorFunctionWrapper<number[][]> =
  withStringInput(validatePalindromes);
