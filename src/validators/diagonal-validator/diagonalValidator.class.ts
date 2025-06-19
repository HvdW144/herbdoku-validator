import type { ValidatorResult } from "../validatorResult.interface";
import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import type { Validator } from "../validator.interface";

export class DiagonalValidator implements Validator {
  private main: boolean = false;
  private anti: boolean = false;

  constructor(main?: boolean, anti?: boolean) {
    if (typeof main === "undefined" && typeof anti === "undefined") {
      this.main = true;
      this.anti = true;
    } else {
      this.main = main || false;
      this.anti = anti || false;
    }
  }

  public validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult {
    if (sudokuString2D.length !== gridSize) {
      throw new Error("Invalid grid size for given string[][] size.");
    }

    const duplicateIndexes: number[] = [];
    if (this.main) {
      const mainDiagonalValues = sudokuString2D.map((row, index) => row[index]);

      duplicateIndexes.push(
        ...this.checkDiagonal(mainDiagonalValues, gridSize)
      );
    }

    if (this.anti) {
      const antiDiagonalValues = sudokuString2D.map(
        (row, index) => row[gridSize - 1 - index]
      );

      duplicateIndexes.push(
        ...this.checkDiagonal(antiDiagonalValues, gridSize)
      );
    }

    const isValid = duplicateIndexes.length === 0;

    return { isValid, messages: [], invalidIndexes: duplicateIndexes };
  }

  public checkDiagonal(
    diagonalStringArray: (string | undefined)[],
    gridSize: number
  ) {
    if (diagonalStringArray.includes(undefined)) {
      throw new Error("Main diagonal contains undefined values.");
    }

    const duplicates = validateSetNoDoubles(diagonalStringArray as string[]);
    const duplicateIndexes: number[] = [];
    duplicates.map((index) => {
      duplicateIndexes.push(index * gridSize + index);
    });
    return duplicateIndexes;
  }
}
