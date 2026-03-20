import type { ValidatorResult } from "./validatorResult.interface";

/**
 * @deprecated - use ValidatorFunction instead
 */
export interface ValidatorClass {
  validate(
    sudokuString2D: string | string[][],
    gridSize: number,
  ): ValidatorResult;
}
