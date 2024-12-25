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
      console.log("mainDiagonalValues", mainDiagonalValues);
      // TODO: make mainDiagonalValues not return undefined
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
