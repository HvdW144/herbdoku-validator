import { Validator } from "../../validator.abstract";
import type { ValidatorResult } from "../../validatorResult.interface";
import type { KropkiDot } from "../kropkiDot.interface";

export class BlackKropkiValidator extends Validator {
  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    //TODO: implement

    return {
      isValid: false,
    };
  }
}
