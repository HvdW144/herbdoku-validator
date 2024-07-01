import type { ValidatorResult } from "../validatorResult.interface";
import type { Validator } from "../validator.interface";
import type { Thermometer } from "./thermometer.interface";

export class ThermoValidator implements Validator {
  private thermoArray: Thermometer[];

  constructor(thermoArray: Thermometer[]) {
    this.thermoArray = thermoArray;
  }

  public validate(sudokuString: string): ValidatorResult {
    let finalResult: ValidatorResult = {
      isValid: true,
      messages: [],
      invalidIndexes: [],
    };

    this.thermoArray.forEach((thermo) => {
      const thermoValues = thermo.indexes.map((index) =>
        Number(sudokuString.charAt(index))
      );
      const thermoDifference = thermo.thermoDifference || 1;

      const invalidIndexes = thermoValues.filter((value, index) => {
        if (index === 0) {
          return;
        }
        return value - (thermoValues[index - 1] || 0) < thermoDifference;
      });

      if (invalidIndexes.length > 0) {
        finalResult.isValid = false;
        finalResult.invalidIndexes.push(...invalidIndexes);
      }
    });

    return finalResult;
  }
}
