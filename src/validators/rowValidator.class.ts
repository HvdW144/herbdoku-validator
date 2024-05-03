import { validateSetNoDoubles } from "./validator-util/validateSet.util";
import { Validator } from "./validator.abstract";
import type { ValidatorResult } from "./validatorResult.interface";

export class RowValidator extends Validator {
  public validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult {
    if (sudokuString2D.length !== gridSize) {
      throw new Error("Invalid grid size for given string[][] size.");
    }

    const duplicates: string[] = [];
    for (let i = 0; i < gridSize; i++) {
      const row = sudokuString2D[i] as string[];
      duplicates.push(...validateSetNoDoubles(row));
    }
    const isValid = duplicates.length === 0;

    return { isValid: isValid, duplicates: duplicates };
  }
}
