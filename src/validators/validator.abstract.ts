import type { ValidatorResult } from "./validatorResult.interface";

export abstract class Validator {
  public abstract validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult;
}
