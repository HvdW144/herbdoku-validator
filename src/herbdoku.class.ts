import type { ValidatorResult } from "./validators/validatorResult.interface";
import { sudokuStringToStringArray } from "./util/stringManipulation.util";
import { BoxValidator } from "./validators/box-validator/boxValidator.class";
import { ColumnValidator } from "./validators/column-validator/columnValidator.class";
import { RowValidator } from "./validators/row-validator/rowValidator.class";
import type { ValidatorResultTotal } from "./validators/validatorResultTotal.interface";
import type { IHerbdoku } from "./herbdoku.interface";

export class ConcreteHerbdoku implements IHerbdoku {
  private sudokuString2D: string[][];
  /**
   * The size of the grid. Default is 9. Supported sizes are 4 and 9 (open an issue if you need more sizes).
   */
  private gridSize: number;
  private validatorResultTotal: ValidatorResultTotal;

  constructor(sudokuString: string, gridSize: number = 9) {
    this.gridSize = gridSize;
    this.sudokuString2D = sudokuStringToStringArray(sudokuString, gridSize);
    this.validatorResultTotal = {
      isValid: true,
      messages: [],
      invalidIndexes: [],
    };
  }

  /**
   * This method should be called last to get the final result.
   */
  public build(): ValidatorResultTotal {
    return this.validatorResultTotal;
  }

  //default validation
  public validateDefault(): this {
    return this.validateRows().validateColumns().validateBoxes();
  }

  public validateRows(): this {
    const rowValidator = new RowValidator();
    const result = rowValidator.validate(this.sudokuString2D, this.gridSize);
    this.appendValidatorResultTotal(result);
    return this;
  }

  public validateColumns(): this {
    const columnValidator = new ColumnValidator();
    const result = columnValidator.validate(this.sudokuString2D, this.gridSize);
    this.appendValidatorResultTotal(result);
    return this;
  }

  public validateBoxes(): this {
    const boxValidator = new BoxValidator();
    const result = boxValidator.validate(this.getSudokuString(), this.gridSize);
    this.appendValidatorResultTotal(result);
    return this;
  }

  //kropki validation
  public validateWhiteKropki(whiteKropki: string[]): this {
    return this;
  }

  //helper methods
  private appendValidatorResultTotal(validatorResult: ValidatorResult) {
    if (!validatorResult.isValid) {
      this.validatorResultTotal.isValid = false;

      const existingInvalidIndexes = new Set(
        this.validatorResultTotal.invalidIndexes
      );
      const newInvalidIndexes = (validatorResult.invalidIndexes ?? []).filter(
        (invalidIndex) => !existingInvalidIndexes.has(invalidIndex)
      );
      this.validatorResultTotal.invalidIndexes.push(...newInvalidIndexes);
    }

    if (validatorResult.messages) {
      this.validatorResultTotal.messages.push(...validatorResult.messages);
    }
  }

  //----------------------BOILER PLATE CODE----------------------
  public getGridSize(): number {
    return this.gridSize;
  }

  public getSudokuString2D(): string[][] {
    return this.sudokuString2D;
  }

  public getSudokuString(): string {
    return this.sudokuString2D.map((row) => row.join("")).join("");
  }

  public setSudokuString(sudokuString: string | string[][]): void {
    if (typeof sudokuString === "string") {
      this.sudokuString2D = sudokuStringToStringArray(
        sudokuString,
        this.gridSize
      );
    } else if (Array.isArray(sudokuString)) {
      if (sudokuString.length !== this.gridSize ** 2) {
        throw new Error("Invalid string length for given grid size.");
      }
      this.sudokuString2D = sudokuString;
    } else {
      throw new Error("Invalid input type for setSudokuString");
    }
  }
}
