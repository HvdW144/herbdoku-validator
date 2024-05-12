import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import { Validator } from "../validator.abstract";
import type { ValidatorResult } from "../validatorResult.interface";
import boxIndexes from "./boxIndexes.json";

export class BoxValidator extends Validator {
  public validate(
    sudokuString2D: string[][],
    gridSize: number
  ): ValidatorResult {
    if (sudokuString2D.length !== gridSize) {
      throw new Error("Invalid grid size for given string[][] size.");
    }

    // const duplicateIndexes: number[] = [];
    // const boxIndexes = this.getBoxIndexesForGivenGridSize(gridSize);
    // boxIndexes.forEach(box => {
    //   const boxValues = box.map(index => {
    //     const row = Math.floor(index / gridSize);
    //     const column = index % gridSize;
    //     return sudokuString2D[row][column];
    //   });

    //   const boxDuplicates = validateSetNoDoubles(boxValues);
    //   boxDuplicates.map(index => {
    //     duplicateIndexes.push(index);
    //   });

    // });
    const isValid = duplicateIndexes.length === 0;

    return { isValid: isValid, duplicates: duplicateIndexes };
  }

  private getBoxIndexesForGivenGridSize(gridSize: number): string[][] {
    switch (gridSize) {
      case 4:
        return boxIndexes[4];
      case 9:
        return boxIndexes[9];
      default:
        throw new Error("Grid size not supported.");
    }
  }
}
