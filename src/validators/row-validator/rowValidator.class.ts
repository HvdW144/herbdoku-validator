import type { ValidatorResult } from "../../../dist";
import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import { Validator } from "../validator.abstract";

export class RowValidator extends Validator {
  public validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult {
    if (sudokuString2D.length !== gridSize) {
      throw new Error("Invalid grid size for given string[][] size.");
    }

    const duplicateIndexes: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      const row = sudokuString2D[i] as string[];

      const rowDuplicates = validateSetNoDoubles(row);
      rowDuplicates.map((index) => {
        duplicateIndexes.push(i * gridSize + index);
      });
    }
    const isValid = duplicateIndexes.length === 0;

    return { isValid: isValid, duplicates: duplicateIndexes };
  }
}
