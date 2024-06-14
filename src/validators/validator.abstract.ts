import type { ValidatorResult } from "./validatorResult.interface";

export abstract class Validator {
  //TODO: make interface
  public abstract validate(
    sudokuString2D: string | string[][],
    gridSize: number
  ): ValidatorResult;
}
