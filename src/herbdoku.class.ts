import type { ValidatorResult } from "./validators/validatorResult.interface";
import { sudokuStringToStringArray } from "./util/stringManipulation.util";
import { BoxValidator } from "./validators/box-validator/boxValidator.class";
import { validateColumns } from "./validators/column-validator/columnValidator.class";
import { validateRows } from "./validators/row-validator/rowValidator";
import type { IHerbdoku } from "./herbdoku.interface";
import type { KropkiDot } from "./validators/kropki-validator/kropkiDot.interface";
import { KropkiValidator } from "./validators/kropki-validator/kropkiValidator.class";
import type { Thermometer } from "./validators/thermo-validator/thermometer.interface";
import { ThermoValidator } from "./validators/thermo-validator/thermoValidator.class";
import { DiagonalValidator } from "./validators/diagonal-validator/diagonalValidator.class";

export class ConcreteHerbdoku implements IHerbdoku {
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
    this.validatorResultTotal = {
      isValid: true,
      messages: [],
      invalidIndexes: new Set<number>(),
    };
  }

  public build(): ValidatorResult {
    return this.validatorResultTotal;
  }

  //default validation
  public default(): this {
    return this.rows().columns().boxes();
  }

  public rows(): this {
    const result = validateRows(this.sudokuGrid, this.gridSize);
    this.appendValidatorResultTotal(result);
    return this;
  }

  public columns(): this {
    const result = validateColumns(this.sudokuGrid, this.gridSize);
    this.appendValidatorResultTotal(result);
    return this;
  }

  public boxes(): this {
    const result = new BoxValidator().validate(
      this.getSudokuString(),
      this.gridSize,
    );
    this.appendValidatorResultTotal(result);
    return this;
  }

  //kropki validation
  public kropki(kropkiDots: KropkiDot[]): this {
    const result = new KropkiValidator(kropkiDots).validate(
      this.getSudokuString(),
      this.gridSize,
    );
    this.appendValidatorResultTotal(result);
    return this;
  }

  //thermo validation
  public thermos(thermoArray: Thermometer[]): this {
    const result = new ThermoValidator(thermoArray).validate(
      this.getSudokuString(),
    );
    this.appendValidatorResultTotal(result);
    return this;
  }

  public diagonals(main?: boolean, anti?: boolean): this {
    const result = new DiagonalValidator(main, anti).validate(
      this.getSudokuString2D(),
      this.gridSize,
    );
    this.appendValidatorResultTotal(result);
    return this;
  }

  //--------- helper methods ---------
  private appendValidatorResultTotal(validatorResult: ValidatorResult) {
    if (!validatorResult.isValid) {
      //set false
      this.validatorResultTotal.isValid = false;

      //add invalid indexes
      this.validatorResultTotal.invalidIndexes =
        this.validatorResultTotal.invalidIndexes.union(
          validatorResult.invalidIndexes,
        );
    }

    //add messages
    if (validatorResult.messages) {
      this.validatorResultTotal.messages.push(...validatorResult.messages);
    }
  }

  //getters and setters
  public getGridSize(): number {
    return this.gridSize;
  }

  public getSudokuString2D(): string[][] {
    return this.sudokuString2D;
  }

  public getSudokuString(): string {
    return this.sudokuString2D.map((row) => row.join("")).join("");
  }

  //refactor this
  public setSudokuString(sudokuString: string | string[][]): void {
    if (typeof sudokuString === "string") {
      this.sudokuString2D = sudokuStringToStringArray(
        sudokuString,
        this.gridSize,
      );
      this.sudokuGrid = new Uint8Array(
        sudokuString.split("").map((char) => parseInt(char, 10)),
      );
    } else if (Array.isArray(sudokuString)) {
      if (sudokuString.length !== this.gridSize ** 2) {
        throw new Error("Invalid string length for given grid size.");
      }
      this.sudokuString2D = sudokuString;
      const flatString = sudokuString.map((row) => row.join("")).join("");
      this.sudokuGrid = new Uint8Array(
        flatString.split("").map((char) => parseInt(char, 10)),
      );
    } else {
      throw new Error("Invalid input type for setSudokuString");
    }
  }
}
