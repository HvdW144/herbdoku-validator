import type { ValidatorResult } from "../types";
import { sudokuStringToStringArray } from "./util/stringManipulation.util";
import { ColumnValidator } from "./validators/columnValidator.class";
import { RowValidator } from "./validators/rowValidator.class";

export default class Herbdoku {
  private sudokuString: string;
  private sudokuString2D: string[][];
  /**
   * The size of the grid. Default is 9. Supported sizes are 4 and 9 (open an issue if you need more sizes).
   */
  public gridSize: number;

  constructor(sudokuString: string, gridSize: number = 9) {
    this.gridSize = gridSize;
    this.sudokuString = sudokuString;
    this.sudokuString2D = sudokuStringToStringArray(sudokuString, gridSize);
  }

  public validateDefault(): boolean {
    return (
      this.validateRows() && this.validateColumns() && this.validateBoxes()
    );
  }

  public validateRows(): ValidatorResult {
    const rowValidator = new RowValidator();
    return rowValidator.validate(this.sudokuString2D, this.gridSize);
  }

  public validateColumns(): ValidatorResult {
    const columnValidator = new ColumnValidator();
    return columnValidator.validate(this.sudokuString2D, this.gridSize);
  }

  public validateBoxes(): boolean {
    return false;
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
