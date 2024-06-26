import type { ValidatorResult } from "../validatorResult.interface";
import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import type { Validator } from "../validator.interface";

export class RowValidator implements Validator {
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

    return { isValid: isValid, messages: [], invalidIndexes: duplicateIndexes };
  }
}
