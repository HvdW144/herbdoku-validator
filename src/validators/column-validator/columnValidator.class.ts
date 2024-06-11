import type { ValidatorResult } from "../validatorResult.interface";
import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import { Validator } from "../validator.abstract";

export class ColumnValidator extends Validator {
  public validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult {
    if (sudokuString2D.length !== gridSize) {
      throw new Error("Invalid grid size for given string[][] size.");
    }

    const duplicateIndexes: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      const column = sudokuString2D.map((row) => row[i]) as string[];

      const columnDuplicates = validateSetNoDoubles(column);
      columnDuplicates.map((index) => {
        duplicateIndexes.push(index * gridSize + i);
      });
    }
    const isValid = duplicateIndexes.length === 0;

    return { isValid: isValid, duplicates: duplicateIndexes };
  }
}
