import { Validator } from "../validator.abstract";
import type { ValidatorResult } from "../validatorResult.interface";
import { BlackKropkiValidator } from "./black-kropki-validator/blackKropkiValidator.class";
import type { KropkiDot } from "./kropkiDot.interface";
import { WhiteKropkiValidator } from "./white-kropki-validator/whiteKropkiValidator.class";

export class KropkiValidator extends Validator {
  private kropkiArray: KropkiDot[];

  constructor(kropkiArray: KropkiDot[]) {
    super();
    this.kropkiArray = kropkiArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    const whiteKropkiDots = this.kropkiArray.filter((dot) => {
      dot.kropkiType === "white" || dot.kropkiType === 0;
    });
    const blackKropkiDots = this.kropkiArray.filter((dot) => {
      dot.kropkiType === "black" || dot.kropkiType === 1;
    });

    let finalResult: ValidatorResult = { isValid: true };

    if (whiteKropkiDots.length !== 0) {
      const whiteKropkiValidator = new WhiteKropkiValidator(whiteKropkiDots);
      const result = whiteKropkiValidator.validate(sudokuString, gridSize);
      if (!result.isValid) {
        finalResult.isValid = false;
        if (!finalResult.invalidIndexes) {
          finalResult.invalidIndexes = [];
        }
        finalResult.invalidIndexes.push(...(result.invalidIndexes || []));
      }
    }

    const blackKropkiValidator = new BlackKropkiValidator();

    return {
      isValid: false,
    };
  }
}
