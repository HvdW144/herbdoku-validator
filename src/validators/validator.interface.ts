import type { ValidatorResult } from "./validatorResult.interface";

export interface Validator {
  validate(
    sudokuString2D: string | string[][],
    gridSize: number
  ): ValidatorResult;
}
