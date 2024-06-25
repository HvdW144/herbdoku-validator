import type { ValidatorResult } from "../validatorResult.interface";
import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import type { Validator } from "../validator.interface";
import type { Thermometer } from "./thermometer.interface";

export class ThermoValidator implements Validator {
  private thermoArray: Thermometer[];

  constructor(thermoArray: Thermometer[]) {
    this.thermoArray = thermoArray;
  }

  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    let finalResult: ValidatorResult = {
      isValid: true,
      messages: [],
      invalidIndexes: [],
    };

    this.thermoArray.forEach((thermo) => {
      const thermoValues = thermo.indexes.map((cell) =>
        Number(sudokuString.charAt(cell))
      );

      //TODO: foreach thermocell here
    });

    return finalResult;
  }
}
