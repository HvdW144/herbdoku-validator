import type { KropkiDot } from "../src/validators/kropki-validator/kropkiDot.interface";
import type { Thermometer } from "./validators/thermo-validator/thermometer.interface";
import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";

export interface IHerbdoku {
  build(): ValidatorResultTotal;
  validateDefault(): this;
  validateRows(): this;
  validateColumns(): this;
  validateBoxes(): this;
  validateKropki(kropkiArray: KropkiDot[]): this;
  validateThermos(thermoArray: Thermometer[]): this;
}
