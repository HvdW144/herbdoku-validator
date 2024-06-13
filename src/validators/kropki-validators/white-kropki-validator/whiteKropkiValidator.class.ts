import { Validator } from "../../validator.abstract";
import type { ValidatorResult } from "../../validatorResult.interface";

export class WhiteKropkiValidator extends Validator {
  private whiteKropkiArray: number[][]; //TODO: or number[]

  constructor(whiteKropkiArray: number[][]) {
    super();
    this.whiteKropkiArray = whiteKropkiArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    if (sudokuString.length !== gridSize ** 2) {
      throw new Error("Invalid grid size for given string size.");
    }

    this.whiteKropkiArray.forEach((KropkiDot) => {
      this.validateKropkiDot(sudokuString, gridSize, KropkiDot);
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

    const [x1 = -1, x2 = -1, value = 1] = kropkiDotArray;

    const value1 = sudokuString.charAt(x1); //it's a string..
    const value2 = sudokuString.charAt(x2);

    if (x1 < 0 || x1 >= gridSize ** 2 || x2 < 0 || x2 >= gridSize ** 2) {
      throw new Error("The indexes of the kropki dot are out of bounds.");
    }

    if (x1 - value == x2 || x2 - value == x1) {
      return { isValid: true, invalidIndexes: [] };
    } else {
      return { isValid: false, invalidIndexes: [] };
    }

    return { isValid: false, invalidIndexes: [] }; //TODO: implement
  }
}
