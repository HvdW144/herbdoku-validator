import type { ValidatorFunction } from "../../types/validatorFunction.type";
import type { ValidatorResult } from "../validatorResult.interface";
import type { KropkiDot } from "./kropkiDot.interface";

export const validateKropki: ValidatorFunction<KropkiDot[]> = (
  grid: Uint8Array,
  gridSize: number,
  kropkiArray: KropkiDot[],
): ValidatorResult => {
  let finalResult: ValidatorResult = {
    isValid: true,
    messages: [],
    invalidIndexes: new Set<number>(),
  };

  kropkiArray.forEach((kropkiDot) => {
    if (!isValidPosition(kropkiDot.x1, kropkiDot.x2, gridSize)) {
      finalResult.messages.push(
        kropkiOutOfBoundsMessage(kropkiDot.x1, kropkiDot.x2),
      );
      return;
    }

    if (kropkiDot.kropkiType === "white" || kropkiDot.kropkiType === 0) {
      finalResult = mergeValidatorResults(
        finalResult,
        validateWhiteKropkiDot(grid, kropkiDot),
      );
    } else if (kropkiDot.kropkiType === "black" || kropkiDot.kropkiType === 1) {
      finalResult = mergeValidatorResults(
        finalResult,
        validateBlackKropkiDot(grid, kropkiDot),
      );
    } else {
      throw new Error("Invalid kropki type: " + kropkiDot.kropkiType);
    }
  });

  return finalResult;
};

const validateWhiteKropkiDot = (
  grid: Uint8Array,
  whiteKropkiDot: KropkiDot,
): ValidatorResult => {
  const value1 = Number(grid[whiteKropkiDot.x1]);
  const value2 = Number(grid[whiteKropkiDot.x2]);

  if (
    value1 - (whiteKropkiDot.kropkiValue || 1) === value2 ||
    value2 - (whiteKropkiDot.kropkiValue || 1) === value1
  ) {
    return { isValid: true, messages: [], invalidIndexes: new Set<number>() };
  }

  return {
    isValid: false,
    messages: [],
    invalidIndexes: new Set<number>([whiteKropkiDot.x1, whiteKropkiDot.x2]),
  };
};

const validateBlackKropkiDot = (
  grid: Uint8Array,
  blackKropkiDot: KropkiDot,
): ValidatorResult => {
  const value1 = Number(grid[blackKropkiDot.x1]);
  const value2 = Number(grid[blackKropkiDot.x2]);

  if (
    value1 * (blackKropkiDot.kropkiValue || 2) === value2 ||
    value2 * (blackKropkiDot.kropkiValue || 2) === value1
  ) {
    return { isValid: true, messages: [], invalidIndexes: new Set<number>() };
  }

  return {
    isValid: false,
    messages: [],
    invalidIndexes: new Set<number>([blackKropkiDot.x1, blackKropkiDot.x2]),
  };
};

function isValidPosition(x1: number, x2: number, gridSize: number) {
  return x1 >= 0 && x1 < gridSize ** 2 && x2 >= 0 && x2 < gridSize ** 2;
}

function kropkiOutOfBoundsMessage(x1: number, x2: number): string {
  return `One or more indexes of the kropki dot with indexes ${x1} and ${x2} are out of bounds. Result is ignored`;
}

function mergeValidatorResults(
  finalResult: ValidatorResult,
  result: ValidatorResult,
): ValidatorResult {
  if (!result.isValid) {
    //set false
    finalResult.isValid = false;

    //add invalid indexes
    finalResult.invalidIndexes = finalResult.invalidIndexes.union(
      result.invalidIndexes,
    );
  }

  //add messages
  if (result.messages) {
    finalResult.messages.push(...result.messages);
  }
  return finalResult;
}
