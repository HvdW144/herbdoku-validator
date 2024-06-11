import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";

export interface IHerbdoku {
  build(): ValidatorResultTotal;
  validateDefault(): this;
  validateRows(): this;
  validateColumns(): this;
  validateBoxes(): this;
}
