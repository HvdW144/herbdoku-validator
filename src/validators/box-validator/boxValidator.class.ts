import { validateSetNoDoubles } from "../validator-util/validateSet.util";
import { Validator } from "../validator.abstract";
import type { ValidatorResult } from "../validatorResult.interface";
import boxIndexes from "./boxIndexes.json";

export class BoxValidator extends Validator {
  public validate(sudokuString: string, gridSize: number): ValidatorResult {
    if (sudokuString.length !== gridSize ** 2) {
      throw new Error("Invalid grid size for given string size.");
    }

    const duplicateIndexes: number[] = [];
    const boxIndexes = this.getBoxIndexesForGivenGridSize(gridSize);
    const boxValues = boxIndexes.map((box) => {
      return box.map((index) => {
        return sudokuString.charAt(index);
      });
    });

    boxValues.forEach((box: string[]) => {
      const boxDuplicates = validateSetNoDoubles(box);
      boxDuplicates.map((index) => {
        duplicateIndexes.push(index);
      });
    });

    const isValid = duplicateIndexes.length === 0;

    return { isValid: isValid, duplicates: duplicateIndexes };
  }

  private getBoxIndexesForGivenGridSize(gridSize: number): number[][] {
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