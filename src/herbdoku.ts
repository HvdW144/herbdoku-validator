import { sudokuStringToStringArray } from "./util/stringManipulation.util";
import { BoxValidator } from "./validators/box-validator/boxValidator.class";
import { ColumnValidator } from "./validators/column-validator/columnValidator.class";
import { RowValidator } from "./validators/row-validator/rowValidator.class";
import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";

export default class Herbdoku {
  private sudokuString: string;
  private sudokuString2D: string[][];
  /**
   * The size of the grid. Default is 9. Supported sizes are 4 and 9 (open an issue if you need more sizes).
   */
  private gridSize: number;
  private validatorResultTotal: ValidatorResultTotal;

  constructor(sudokuString: string, gridSize: number = 9) {
    this.gridSize = gridSize;
    this.sudokuString = sudokuString;
    this.sudokuString2D = sudokuStringToStringArray(sudokuString, gridSize);
    this.validatorResultTotal = {
      isValid: true,
      messages: [],
      duplicates: [],
    };
  }

  /**
   * This method should be called last to get the final result.
   */
  public build(): ValidatorResultTotal {
    return this.validatorResultTotal;
  }

  public validateDefault(): this {
    return this.validateRows().validateColumns().validateBoxes();
  }

  public validateRows(): this {
    const rowValidator = new RowValidator();
    const result = rowValidator.validate(this.sudokuString2D, this.gridSize);
    if (!result.isValid) {
      this.validatorResultTotal.isValid = false;
      this.validatorResultTotal.duplicates.push(...(result.duplicates ?? []));
      if (result.message) {
        this.validatorResultTotal.messages.push(result.message);
      }
    }
    return this;
  }

  public validateColumns(): this {
    const columnValidator = new ColumnValidator();
    const result = columnValidator.validate(this.sudokuString2D, this.gridSize);
    if (!result.isValid) {
      this.validatorResultTotal.isValid = false;
      this.validatorResultTotal.duplicates.push(...(result.duplicates ?? []));
      if (result.message) {
        this.validatorResultTotal.messages.push(result.message);
      }
    }
    return this;
  }

  public validateBoxes(): this {
    const boxValidator = new BoxValidator();
    const result = boxValidator.validate(this.sudokuString, this.gridSize);
    if (!result.isValid) {
      this.validatorResultTotal.isValid = false;
      this.validatorResultTotal.duplicates.push(...(result.duplicates ?? []));
      if (result.message) {
        this.validatorResultTotal.messages.push(result.message);
      }
    }
    return this;
  }

  //----------------------BOILER PLATE CODE----------------------
  public getGridSize(): number {
    return this.gridSize;
  }

  public getSudokuString2D(): string[][] {
    return this.sudokuString2D;
  }

  public setGridSize(gridSize: number): void {
    this.gridSize = gridSize;
  }

  public setSudokuString(sudokuString2D: string[][]): void {
    this.sudokuString2D = sudokuString2D;
  }
}
