import type { Validator } from "../validator.interface";
import type { ValidatorResult } from "../validatorResult.interface";
import type { KropkiDot } from "./kropkiDot.interface";

export class KropkiValidator implements Validator {
  private kropkiArray: KropkiDot[];

  constructor(kropkiArray: KropkiDot[]) {
    this.kropkiArray = kropkiArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    let finalResult: ValidatorResult = {
      isValid: true,
      messages: [],
      invalidIndexes: [],
    };

    this.kropkiArray.forEach((kropkiDot) => {
      let result: ValidatorResult;
      if (
        !(
          kropkiDot.x1 < 0 ||
          kropkiDot.x1 >= gridSize ** 2 ||
          kropkiDot.x2 < 0 ||
          kropkiDot.x2 >= gridSize ** 2
        )
      ) {
        if (kropkiDot.kropkiType === "white" || kropkiDot.kropkiType === 0) {
          result = this.validateWhiteKropkiDot(sudokuString, kropkiDot);
        } else if (
          kropkiDot.kropkiType === "black" ||
          kropkiDot.kropkiType === 1
        ) {
          result = this.validateBlackKropkiDot(sudokuString, kropkiDot);
        } else {
          throw new Error("Invalid kropki type.");
        }

        if (!result.isValid) {
          finalResult.isValid = false;
          finalResult.invalidIndexes.push(...result.invalidIndexes);
        }
      } else {
        finalResult.messages.push(
          `One or more indexes of the kropki dot with indexes ${kropkiDot.x1} and ${kropkiDot.x2} are out of bounds. Result is ignored`
        );
      }
    });

    return finalResult;
  }

  private validateWhiteKropkiDot(
    sudokuString: string,
    whiteKropkiDot: KropkiDot
  ): ValidatorResult {
    const value1 = Number(sudokuString.charAt(whiteKropkiDot.x1));
    const value2 = Number(sudokuString.charAt(whiteKropkiDot.x2));

    if (
      value1 - (whiteKropkiDot.kropkiValue || 1) === value2 ||
      value2 - (whiteKropkiDot.kropkiValue || 1) === value1
    ) {
      return { isValid: true, messages: [], invalidIndexes: [] };
    }

    return {
      isValid: false,
      messages: [],
      invalidIndexes: [whiteKropkiDot.x1, whiteKropkiDot.x2],
    };
  }

  private validateBlackKropkiDot(
    sudokuString: string,
    blackKropkiDot: KropkiDot
  ): ValidatorResult {
    const value1 = Number(sudokuString.charAt(blackKropkiDot.x1));
    const value2 = Number(sudokuString.charAt(blackKropkiDot.x2));

    if (
      value1 * (blackKropkiDot.kropkiValue || 2) === value2 ||
      value2 * (blackKropkiDot.kropkiValue || 2) === value1
    ) {
      return { isValid: true, messages: [], invalidIndexes: [] };
    }

    return {
      isValid: false,
      messages: [],
      invalidIndexes: [blackKropkiDot.x1, blackKropkiDot.x2],
    };
  }
}
