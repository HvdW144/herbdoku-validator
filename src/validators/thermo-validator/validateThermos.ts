import type { IValidatorResult } from "../validatorResult.interface";
import type { Thermometer } from "./thermometer.interface";
import type { ValidatorFunction } from "../../types/validatorFunction.type";

export const validateThermos: ValidatorFunction<Thermometer[]> = (
  grid: Uint8Array,
  _: number,
  thermoArray: Thermometer[],
): IValidatorResult => {
  const finalResult: IValidatorResult = {
    isValid: true,
    messages: [],
    invalidIndexes: new Set<number>(),
  };

  thermoArray.forEach((thermo) => {
    const thermoValues = thermo.indexes.map((gridIndex) => ({
      value: grid[gridIndex],
      index: gridIndex,
    }));
    const thermoDifference = thermo.thermoDifference ?? 1;

    thermoValues.filter((thermoValue, thermoIndex) => {
      if (thermoIndex === 0) {
        return;
      }
      //TODO: fix || 0
      if (
        (thermoValue.value || 0) - (thermoValues[thermoIndex - 1]?.value || 0) <
        thermoDifference
      ) {
        finalResult.invalidIndexes.add(thermoValue.index);
        finalResult.isValid = false;
      }
    });
  });

  return finalResult;
};
