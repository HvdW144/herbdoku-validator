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
      this.validateKropkiDot(KropkiDot);
    });

    return { isValid: false, duplicates: [] };
  }

  private validateKropkiDot(): ValidatorResult {}
}
