import { ConcreteHerbdoku } from "./herbdoku.class";
import type { IHerbdoku } from "./herbdoku.interface";
import type { KropkiDot } from "./validators/kropki-validator/kropkiDot.interface";
import type { Thermometer } from "./validators/thermo-validator/thermometer.interface";
import type { IValidatorResult } from "./validators/validatorResult.interface";

export class HerbdokuProxy implements IHerbdoku {
  private herbdoku: ConcreteHerbdoku;

  /**
   * @param sudokuString zero-based string representation of the sudoku grid
   * @param gridSize  The size of the grid. Defaults to 9
   */
  constructor(sudokuString: string, gridSize: number = 9) {
    this.herbdoku = new ConcreteHerbdoku(sudokuString, gridSize);
  }

  public build(): IValidatorResult {
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

  public diagonals(main: boolean = true, anti: boolean = true): this {
    this.herbdoku.diagonals(main, anti);
    return this;
  }

  public palindromes(palindromeArray: number[][]): this {
    this.herbdoku.palindromes(palindromeArray);
    return this;
  }

  //--------------- deprecated methods ---------------
  /**
   * @deprecated - use default() instead, will be removed in v1.0.0
   */
  public validateDefault(): this {
    this.herbdoku.default();
    return this;
  }

  /**
   * @deprecated - use rows() instead, will be removed in v1.0.0
   */
  public validateRows(): this {
    this.herbdoku.rows();
    return this;
  }

  /**
   * @deprecated - use columns() instead, will be removed in v1.0.0
   */
  public validateColumns(): this {
    this.herbdoku.columns();
    return this;
  }

  /**
   * @deprecated - use boxes() instead, will be removed in v1.0.0
   */
  public validateBoxes(): this {
    this.herbdoku.boxes();
    return this;
  }

  /**
   * @deprecated - use kropki() instead, will be removed in v1.0.0
   */
  public validateKropki(kropkiArray: KropkiDot[]): this {
    this.herbdoku.kropki(kropkiArray);
    return this;
  }

  /**
   * @deprecated - use thermos() instead, will be removed in v1.0.0
   */
  public validateThermos(thermoArray: Thermometer[]): this {
    this.herbdoku.thermos(thermoArray);
    return this;
  }

  /**
   * @deprecated - use diagonals() instead, will be removed in v1.0.0
   */
  public validateDiagonals(main: boolean = true, anti: boolean = true): this {
    this.herbdoku.diagonals(main, anti);
    return this;
  }
}
