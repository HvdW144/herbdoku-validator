import { Validator } from "../../validator.abstract";
import type { ValidatorResult } from "../../validatorResult.interface";
import type { KropkiDot } from "../kropkiDot.interface";

//TODO: should be called by global kropki validator class
export class WhiteKropkiValidator extends Validator {
  private whiteKropkiArray: KropkiDot[];

  constructor(whiteKropkiArray: KropkiDot[]) {
    super();
    this.whiteKropkiArray = whiteKropkiArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    let finalResult: ValidatorResult = { isValid: true };

    this.whiteKropkiArray.forEach((KropkiDot) => {
      const result = this.validateKropkiDot(sudokuString, gridSize, KropkiDot);

      if (!result.isValid) {
        finalResult.isValid = false;
        if (!finalResult.invalidIndexes) {
          finalResult.invalidIndexes = [];
        }
        finalResult.invalidIndexes.push(...(result.invalidIndexes || []));
      }
    });

    return finalResult;
  }

  private validateKropkiDot(
    sudokuString: string,
    gridSize: number,
    kropkiDot: KropkiDot
  ): ValidatorResult {
    if (
      kropkiDot.x1 < 0 ||
      kropkiDot.x1 >= gridSize ** 2 ||
      kropkiDot.x2 < 0 ||
      kropkiDot.x2 >= gridSize ** 2
    ) {
      throw new Error("The indexes of the kropki dot are out of bounds.");
    }

    const value1 = Number(sudokuString.charAt(kropkiDot.x1));
    const value2 = Number(sudokuString.charAt(kropkiDot.x2));

    if (
      value1 - (kropkiDot.kropkiValue || 1) == value2 ||
      value2 - (kropkiDot.kropkiValue || 1) == value1
    ) {
      return { isValid: true, invalidIndexes: [] };
    }

    return { isValid: false, invalidIndexes: [kropkiDot.x1, kropkiDot.x2] };
  }
}
