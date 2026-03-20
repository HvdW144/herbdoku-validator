import { ConcreteHerbdoku } from "./herbdoku.class";
import type { IHerbdoku } from "./herbdoku.interface";
import type { KropkiDot } from "./validators/kropki-validator/kropkiDot.interface";
import type { Thermometer } from "./validators/thermo-validator/thermometer.interface";
import type { ValidatorResult } from "./validators/validatorResult.interface";

export class HerbdokuProxy implements IHerbdoku {
  private herbdoku: ConcreteHerbdoku;

  /**
   * @param sudokuString zero-based string representation of the sudoku grid
   * @param gridSize  The size of the grid. Defaults to 9
   */
  constructor(sudokuString: string, gridSize: number = 9) {
    this.herbdoku = new ConcreteHerbdoku(sudokuString, gridSize);
  }

  public build(): ValidatorResult {
    return this.herbdoku.build();
  }

  public default(): this {
    this.herbdoku.default();
    return this;
  }

  public rows(): this {
    this.herbdoku.rows();
    return this;
  }

  public columns(): this {
    this.herbdoku.columns();
    return this;
  }

  public boxes(): this {
    this.herbdoku.boxes();
    return this;
  }

  public kropki(kropkiArray: KropkiDot[]): this {
    this.herbdoku.kropki(kropkiArray);
    return this;
  }

  public thermos(thermoArray: Thermometer[]): this {
    this.herbdoku.thermos(thermoArray);
    return this;
  }

  public diagonals(main?: boolean, anti?: boolean): this {
    this.herbdoku.diagonals(main, anti);
    return this;
  }
}
