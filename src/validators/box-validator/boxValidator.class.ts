import { findDuplicateIndexes } from "../validator-util/findDuplicateIndexes";
import type { IValidatorResult } from "../validatorResult.interface";
import type { ValidatorFunction } from "../../types/validatorFunction.type";

export const validateBoxes: ValidatorFunction = (
  grid: Uint8Array,
  gridSize: number,
): IValidatorResult => {
  const duplicateIndexes: Set<number> = new Set();
  const boxSize = Math.sqrt(gridSize);

  // Group cell indexes by their box
  const boxes: Map<number, number[]> = new Map();
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const boxRow = Math.floor(row / boxSize);
    const boxCol = Math.floor(col / boxSize);
    const boxId = boxRow * boxSize + boxCol;

    if (!boxes.has(boxId)) {
      boxes.set(boxId, []);
    }
    boxes.get(boxId)!.push(i);
  }

  // Check each box for duplicates
  boxes.forEach((cellIndexes) => {
    const boxValues = new Uint8Array(cellIndexes.length);
    for (let j = 0; j < cellIndexes.length; j++) {
      boxValues[j] = grid[cellIndexes[j]!]!;
    }
    const boxDuplicates = findDuplicateIndexes(boxValues);
    boxDuplicates.forEach((duplicatePosition) => {
      duplicateIndexes.add(cellIndexes[duplicatePosition]!);
    });
  });

  const isValid = duplicateIndexes.size === 0;

  return {
    isValid: isValid,
    messages: [],
    invalidIndexes: duplicateIndexes,
  };
};
