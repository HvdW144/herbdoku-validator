import { Validator } from "../../validator.abstract";
import type { ValidatorResult } from "../../validatorResult.interface";

export class WhiteKropkiValidator extends Validator {
  private whiteKropkiArray: number[][];

  constructor(whiteKropkiArray: number[][]) {
    super();
    this.whiteKropkiArray = whiteKropkiArray;
  }

  public validate(sudokuString: string[][], gridSize: number): ValidatorResult {
    if (sudokuString.length !== gridSize ** 2) {
      throw new Error("Invalid grid size for given string size.");
    }

    this.whiteKropkiArray.forEach((KropkiDot) => {
      this.validateKropkiDot(KropkiDot, gridSize);
    });

    return { isValid: false, invalidIndexes: [] };
  }

  //TODO: make public maybe
  private validateKropkiDot(
    kropkiDotArray: number[],
    gridSize: number
  ): ValidatorResult {
    if (kropkiDotArray.length !== 3 || 4) {
      throw new Error("Kropki dot array length should be 3 or 4.");
    }

    const [x1 = -1, x2 = -1, value = 1] = kropkiDotArray;

    if (x1 === -1 || x2 === -1) {
      throw new Error("Kropki dot array length should be 2 or 3.");
    }

    return { isValid: false, invalidIndexes: [] };
  }
}
