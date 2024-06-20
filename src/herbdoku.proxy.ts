import { ConcreteHerbdoku } from "./herbdoku.class";
import type { IHerbdoku } from "./herbdoku.interface";
import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";
import type { KropkiDot } from "./validators/kropki-validator/kropkiDot.interface";

export class HerbdokuProxy implements IHerbdoku {
  private herbdoku: ConcreteHerbdoku;

  /**
   * @param sudokuString zero-based string representation of the sudoku grid
   * @param gridSize  The size of the grid. Defaults to 9
   */
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

  public validateKropki(kropkiArray: KropkiDot[]): this {
    this.herbdoku.validateKropki(kropkiArray);
    return this;
  }
}
