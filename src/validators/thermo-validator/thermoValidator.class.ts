import type { ValidatorResult } from "../validatorResult.interface";
import type { ValidatorClass } from "../validator.interface";
import type { Thermometer } from "./thermometer.interface";

export class ThermoValidator implements ValidatorClass {
  private thermoArray: Thermometer[];

  constructor(thermoArray: Thermometer[]) {
    this.thermoArray = thermoArray;
  }

  public validate(sudokuString: string): ValidatorResult {
    const finalResult: ValidatorResult = {
      isValid: true,
      messages: [],
      invalidIndexes: new Set<number>(),
    };

    this.thermoArray.forEach((thermo) => {
      const thermoValues = thermo.indexes.map((index) => ({
        value: Number(sudokuString.charAt(index)),
        index: index,
      }));
      const thermoDifference = thermo.thermoDifference ?? 1;

      const invalidIndexes = new Set<number>();
      thermoValues.filter((thermoValue, index) => {
        if (index === 0) {
          return;
        }
        if (
          thermoValue.value - (thermoValues[index - 1]?.value || 0) <
          thermoDifference
        ) {
          invalidIndexes.add(thermoValue.index);
        }
      });

      if (invalidIndexes.size > 0) {
        finalResult.isValid = false;
        finalResult.invalidIndexes =
          finalResult.invalidIndexes.union(invalidIndexes);
      }
    });

    return finalResult;
  }
}
