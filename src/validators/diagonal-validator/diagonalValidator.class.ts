import type { ValidatorResult } from "../validatorResult.interface";
import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import type { Validator } from "../validator.interface";

export class DiagonalValidator implements Validator {
  private main: boolean;
  private anti: boolean;

  constructor(main: boolean, anti: boolean) {
    this.main = main;
    this.anti = anti;
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
      // if (!validateSetNoDoubles(mainDiagonalValues)) {
      //   duplicateIndexes.push(
      //     ...mainDiagonalValues.map((_, index) => index + index * gridSize)
      //   );
      // }
    }

    const isValid = duplicateIndexes.length === 0;

    return { isValid: isValid, messages: [], invalidIndexes: duplicateIndexes };
  }
}
