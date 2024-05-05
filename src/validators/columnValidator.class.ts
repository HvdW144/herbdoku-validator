import { validateSetNoDoubles } from "./validator-util/validateSet.util";
import { Validator } from "./validator.abstract";
import type { ValidatorResult } from "./validatorResult.interface";

export class ColumnValidator extends Validator {
  public validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult {
    if (sudokuString2D.length !== gridSize) {
      throw new Error("Invalid grid size for given string[][] size.");
    }

    const duplicates: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      const row = sudokuString2D[i] as string[];

      const rowDuplicates = validateSetNoDoubles(row);
      rowDuplicates.map((index) => {
        duplicates.push(i * gridSize + index);
      });
    }
    const isValid = duplicates.length === 0;

    return { isValid: isValid, duplicates: duplicates };
  }
}
