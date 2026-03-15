import type { ValidatorResult } from "./validatorResult.interface";

export interface ValidatorClass {
  validate(
    sudokuString2D: string | string[][],
    gridSize: number,
  ): ValidatorResult;
}
