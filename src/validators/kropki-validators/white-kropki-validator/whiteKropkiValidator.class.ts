import { Validator } from "../../validator.abstract";
import type { ValidatorResult } from "../../validatorResult.interface";

export class WhiteKropkiValidator extends Validator {
  private whiteKropkiArray: number[][]; //TODO: or number[]

  constructor(whiteKropkiArray: number[][]) {
    super();
    this.whiteKropkiArray = whiteKropkiArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    //TODO: remove all these checks from validators (handled by Herbdoku class)
    if (sudokuString.length !== gridSize ** 2) {
      throw new Error("Invalid grid size for given string size.");
    }

    let finalResult: ValidatorResult;

    this.whiteKropkiArray.forEach((KropkiDot) => {
      const result = this.validateKropkiDot(sudokuString, gridSize, KropkiDot);

      if (!result.isValid) {
        finalResult.isValid = false;
        finalResult.invalidIndexes.push(...result.invalidIndexes); //TODO: fix (fix validator interface first)
      }
    });

    return { isValid: false, invalidIndexes: [] };
  }

  //TODO: make public maybe (dont, use whiteKropkiArray as number[] instead)
  private validateKropkiDot(
    sudokuString: string,
    gridSize: number,
    kropkiDotArray: number[]
  ): ValidatorResult {
    if (kropkiDotArray.length !== 3 || 4) {
      throw new Error("Kropki dot array length should be 3 or 4.");
    }

    const [x1 = -1, x2 = -1, difference = 1] = kropkiDotArray;

    if (x1 < 0 || x1 >= gridSize ** 2 || x2 < 0 || x2 >= gridSize ** 2) {
      throw new Error("The indexes of the kropki dot are out of bounds.");
    }

    //TODO: not possible for partially filled sudoku
    const value1 = Number(sudokuString.charAt(x1));
    const value2 = Number(sudokuString.charAt(x2));

    if (value1 - difference == value2 || value2 - difference == value1) {
      return { isValid: true, invalidIndexes: [] };
    }

    return { isValid: false, invalidIndexes: [x1, x2] };
  }
}
