import type { ValidatorResult } from "../validatorResult.interface";
import { findDuplicateIndexes } from "../validator-util/findDuplicateIndexes";
import type { ValidatorClass } from "../validator.interface";

export class ColumnValidator implements ValidatorClass {
  public validate(
    sudokuString2D: string[][],
    gridSize: number,
  ): ValidatorResult {
    const duplicateIndexes: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      const column = sudokuString2D.map((row) => row[i]) as string[];

      const columnDuplicates = findDuplicateIndexes(column);
      columnDuplicates.map((index) => {
        duplicateIndexes.push(index * gridSize + i);
      });
    }
    const isValid = duplicateIndexes.length === 0;

    return { isValid: isValid, messages: [], invalidIndexes: duplicateIndexes };
  }
}
