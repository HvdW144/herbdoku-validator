import type { IValidatorResult } from "./validators/validatorResult.interface";
import { ValidatorResult } from "./validators/validatorResult.class";
import { sudokuStringToStringArray } from "./util/stringManipulation.util";
import { BoxValidator } from "./validators/box-validator/boxValidator.class";
import { validateColumns } from "./validators/column-validator/validateColumns";
import { validateRows } from "./validators/row-validator/validateRows";
import type { IHerbdoku } from "./herbdoku.interface";
import type { KropkiDot } from "./validators/kropki-validator/kropkiDot.interface";
import { validateKropki } from "./validators/kropki-validator/validateKropki";
import type { Thermometer } from "./validators/thermo-validator/thermometer.interface";
import { DiagonalValidator } from "./validators/diagonal-validator/diagonalValidator.class";
import { validateThermos } from "../functions";

export class ConcreteHerbdoku implements IHerbdoku {
  /**
   * @deprecated Use sudokuGrid instead. Will be removed in v1.0.0
   */
  private sudokuString2D: string[][];
  private sudokuGrid: Uint8Array;
  /**
   * The size of the grid. Default is 9. Supported sizes are 4 and 9 (open an issue if you need more sizes).
   */
  private gridSize: number;
  private validatorResultTotal: ValidatorResult;

  constructor(sudokuString: string, gridSize: number = 9) {
    if (sudokuString.length !== gridSize * gridSize) {
      throw new Error("Invalid grid size for given sudokuString length.");
    }

    this.gridSize = gridSize;
    this.sudokuString2D = sudokuStringToStringArray(sudokuString, gridSize);
    this.sudokuGrid = new Uint8Array(
      sudokuString.split("").map((char) => parseInt(char, 10)),
    );
    this.validatorResultTotal = new ValidatorResult();
  }

  public build(): IValidatorResult {
    return this.validatorResultTotal;
  }

  //default validation
  public default(): this {
    return this.rows().columns().boxes();
  }

  public rows(): this {
    const result = validateRows(this.sudokuGrid, this.gridSize);
    this.validatorResultTotal.append(result);
    return this;
  }

  public columns(): this {
    const result = validateColumns(this.sudokuGrid, this.gridSize);
    this.validatorResultTotal.append(result);
    return this;
  }

  public boxes(): this {
    const result = new BoxValidator().validate(
      this.getSudokuString(),
      this.gridSize,
    );
    this.validatorResultTotal.append(result);
    return this;
  }

  //kropki validation
  public kropki(kropkiDots: KropkiDot[]): this {
    const result = validateKropki(this.sudokuGrid, this.gridSize, kropkiDots);
    this.validatorResultTotal.append(result);
    return this;
  }

  //thermo validation
  public thermos(thermoArray: Thermometer[]): this {
    const result = validateThermos(this.sudokuGrid, this.gridSize, thermoArray);
    this.validatorResultTotal.append(result);
    return this;
  }

  public diagonals(main?: boolean, anti?: boolean): this {
    const result = new DiagonalValidator(main, anti).validate(
      this.sudokuString2D,
      this.gridSize,
    );
    this.validatorResultTotal.append(result);
    return this;
  }

  /**
   * @deprecated Use sudokuGrid instead. Will be removed in v1.0.0
   */
  public getSudokuString(): string {
    return this.sudokuString2D.map((row) => row.join("")).join("");
  }
}
