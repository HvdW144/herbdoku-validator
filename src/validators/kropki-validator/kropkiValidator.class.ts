import { Validator } from "../validator.abstract";
import type { ValidatorResult } from "../validatorResult.interface";
import type { KropkiDot } from "./kropkiDot.interface";

export class KropkiValidator extends Validator {
  private kropkiArray: KropkiDot[];

  constructor(kropkiArray: KropkiDot[]) {
    super();
    this.kropkiArray = kropkiArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {}
}
