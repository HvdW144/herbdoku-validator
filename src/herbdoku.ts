import type { ValidatorResult } from "../types";
import { sudokuStringToStringArray } from "./util/stringManipulation.util";
import { ColumnValidator } from "./validators/columnValidator.class";
import { RowValidator } from "./validators/rowValidator.class";

export default class Herbdoku {
  public sudokuString2D: string[][];
  public gridSize: number;

  constructor(sudokuString2D: string, gridSize: number = 9) {
    this.gridSize = gridSize;
    this.sudokuString2D = sudokuStringToStringArray(sudokuString2D, gridSize);
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
