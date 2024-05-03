export default class Herbdoku {
  public sudokuString: string;
  public gridSize: number;

  constructor(sudokuString: string, gridSize: number = 9) {
    this.gridSize = gridSize;
    this.sudokuString = sudokuString;
  }

  public validateDefault(): boolean {
    const sudoku = this.sudokuString.split("").map(Number);
    return (
      this.validateRows(sudoku) &&
      this.validateColumns(sudoku) &&
      this.validateBoxes(sudoku)
    );
  }

  private validateRows(sudoku: number[]): boolean {
    for (let i = 0; i < 9; i++) {
      const row = sudoku.slice(i * 9, i * 9 + 9);
      if (!this.validateSet(row)) {
        return false;
      }
    }
    return true;
  }

  private validateColumns(sudoku: number[]): boolean {
    for (let i = 0; i < 9; i++) {
      const column = sudoku.filter((_, j) => j % 9 === i);
      if (!this.validateSet(column)) {
        return false;
      }
    }
    return true;
  }

  private validateBoxes(sudoku: number[]): boolean {
    for (let i = 0; i < 9; i++) {
      const box = sudoku.filter((_, j) => {
        const row = Math.floor(j / 9);
        const col = j % 9;
        return Math.floor(row / 3) * 3 + Math.floor(col / 3) === i;
      });
      if (!this.validateSet(box)) {
        return false;
      }
    }
    return true;
  }

  private validateSet(set: number[]): boolean {
    const setWithoutZeros = set.filter((n) => n !== 0);
    return new Set(setWithoutZeros).size === setWithoutZeros.length;
  }

  //----------------------BOILER PLATE CODE----------------------
  public getGridSize(): number {
    return this.gridSize;
  }

  public getSudokuString(): string {
    return this.sudokuString;
  }

  public setGridSize(gridSize: number): void {
    this.gridSize = gridSize;
  }

  public setSudokuString(sudokuString: string): void {
    this.sudokuString = sudokuString;
  }
}
