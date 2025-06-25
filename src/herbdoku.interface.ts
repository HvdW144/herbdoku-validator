import type { KropkiDot } from "../src/validators/kropki-validator/kropkiDot.interface";
import type { Thermometer } from "./validators/thermo-validator/thermometer.interface";
import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";

export interface IHerbdoku {
  /**
   * This method should be called last to get the final result.
   */
  build(): ValidatorResultTotal;

  /**
   * Simple sugar method to validate rows, columns and boxes.
   */
  validateDefault(): this;
  validateRows(): this;
  validateColumns(): this;
  validateBoxes(): this;
  validateKropki(kropkiArray: KropkiDot[]): this;
  validateThermos(thermoArray: Thermometer[]): this;

  /**
   * Validates that the diagonals don't contain duplicate numbers (x sudoku rule),
   * only works for square grids.
   * @param main - main diagonal, from top left to bottom right
   * @param anti - anti diagonal, from top right to bottom left
   */
  validateDiagonals(main?: boolean, anti?: boolean): this;
}
