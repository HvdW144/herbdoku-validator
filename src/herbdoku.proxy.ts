import { ConcreteHerbdoku } from "./herbdoku.class";
import type { IHerbdoku } from "./herbdoku.interface";
import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";

export class HerbdokuProxy implements IHerbdoku {
  private herbdoku: ConcreteHerbdoku;

  constructor(sudokuString: string, gridSize: number = 9) {
    this.herbdoku = new ConcreteHerbdoku(sudokuString, gridSize);
  }

  public build(): ValidatorResultTotal {
    return this.herbdoku.build();
  }

  public validateDefault(): this {
    this.herbdoku.validateDefault();
    return this;
  }

  public validateRows(): this {
    this.herbdoku.validateRows();
    return this;
  }

  public validateColumns(): this {
    this.herbdoku.validateColumns();
    return this;
  }

  public validateBoxes(): this {
    this.herbdoku.validateBoxes();
    return this;
  }
}
