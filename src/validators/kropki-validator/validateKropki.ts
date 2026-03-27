import type { ValidatorFunction } from "../../types/validatorFunction.type";
import { ValidatorResult } from "../validatorResult.class";
import type { IValidatorResult } from "../validatorResult.interface";
import type { KropkiDot } from "./kropkiDot.interface";

const DEFAULT_WHITE_DIFF = 1;
const DEFAULT_BLACK_RATIO = 2;

export const validateKropki: ValidatorFunction<KropkiDot[]> = (
  grid: Uint8Array,
  gridSize: number,
  kropkiArray: KropkiDot[],
): IValidatorResult => {
  const finalResult = new ValidatorResult();

  for (const kropkiDot of kropkiArray) {
    if (!isValidPosition(kropkiDot.x1, kropkiDot.x2, gridSize)) {
      finalResult.messages.push(
        kropkiOutOfBoundsMessage(kropkiDot.x1, kropkiDot.x2),
      );
      break;
    }

    const validator = getKropkiValidator(kropkiDot.kropkiType);
    finalResult.append(validator(grid, kropkiDot));
  }

  return finalResult;
};

const getKropkiValidator = (
  kropkiType: "white" | "black" | 0 | 1,
): ((grid: Uint8Array, dot: KropkiDot) => IValidatorResult) => {
  if (kropkiType === "white" || kropkiType === 0) {
    return (grid: Uint8Array, dot: KropkiDot) =>
      validateKropkiDot(grid, dot, whiteKropkiComparison, DEFAULT_WHITE_DIFF);
  }
  return (grid: Uint8Array, dot: KropkiDot) =>
    validateKropkiDot(grid, dot, blackKropkiComparison, DEFAULT_BLACK_RATIO);
};

const validateKropkiDot = (
  grid: Uint8Array,
  kropkiDot: KropkiDot,
  compare: (val1: number, val2: number, expectedValue: number) => boolean,
  defaultValue: number,
): IValidatorResult => {
  const value1 = Number(grid[kropkiDot.x1]);
  const value2 = Number(grid[kropkiDot.x2]);
  const expectedValue = kropkiDot.kropkiValue ?? defaultValue;

  if (compare(value1, value2, expectedValue)) {
    return new ValidatorResult();
  }

  return new ValidatorResult(false, [], new Set([kropkiDot.x1, kropkiDot.x2]));
};

const whiteKropkiComparison = (val1: number, val2: number, diff: number) =>
  val1 - diff === val2 || val2 - diff === val1;

const blackKropkiComparison = (val1: number, val2: number, ratio: number) =>
  val1 * ratio === val2 || val2 * ratio === val1;

function isValidPosition(x1: number, x2: number, gridSize: number) {
  return x1 >= 0 && x1 < gridSize ** 2 && x2 >= 0 && x2 < gridSize ** 2;
}

function kropkiOutOfBoundsMessage(x1: number, x2: number): string {
  return `One or more indexes of the kropki dot with indexes ${x1} and ${x2} are out of bounds. Result is ignored`;
}
