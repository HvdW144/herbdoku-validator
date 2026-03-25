import type { ValidatorFunction } from "../../types/validatorFunction.type";
import type { ValidatorResult } from "../validatorResult.interface";
import type { KropkiDot } from "./kropkiDot.interface";

export const validateKropki: ValidatorFunction<KropkiDot[]> = (
  grid: Uint8Array,
  gridSize: number,
  kropkiArray: KropkiDot[],
): ValidatorResult => {
  const finalResult: ValidatorResult = {
    isValid: true,
    messages: [],
    invalidIndexes: new Set<number>(),
  };

  kropkiArray.forEach((kropkiDot) => {
    let result: ValidatorResult;
    if (
      !(
        kropkiDot.x1 < 0 ||
        kropkiDot.x1 >= gridSize ** 2 ||
        kropkiDot.x2 < 0 ||
        kropkiDot.x2 >= gridSize ** 2
      )
    ) {
      if (kropkiDot.kropkiType === "white" || kropkiDot.kropkiType === 0) {
        result = validateWhiteKropkiDot(grid, kropkiDot);
      } else if (
        kropkiDot.kropkiType === "black" ||
        kropkiDot.kropkiType === 1
      ) {
        result = validateBlackKropkiDot(grid, kropkiDot);
      } else {
        throw new Error("Invalid kropki type.");
      }

      if (!result.isValid) {
        finalResult.isValid = false;
        finalResult.invalidIndexes = finalResult.invalidIndexes.union(
          result.invalidIndexes,
        );
      }
    } else {
      finalResult.messages.push(
        `One or more indexes of the kropki dot with indexes ${kropkiDot.x1} and ${kropkiDot.x2} are out of bounds. Result is ignored`,
      );
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
    invalidIndexes: new Set<number>()
      .add(whiteKropkiDot.x1)
      .add(whiteKropkiDot.x2),
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
    invalidIndexes: new Set<number>()
      .add(blackKropkiDot.x1)
      .add(blackKropkiDot.x2),
  };
};
