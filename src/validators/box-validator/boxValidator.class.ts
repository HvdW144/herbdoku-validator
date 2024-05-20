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
        const boxIndex = boxValues.indexOf(box);
        duplicateIndexes.push(boxIndexes.at(boxIndex)?.at(index) as number);
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

function getBoxValues(boxIndexes2: number[][], str: string): string[][] {
  const boxValues: string[][] = [];

  for (const boxIndex of boxIndexes2) {
    const row: string[] = [];
    for (const index of boxIndex) {
      if (index >= 0 && index < str.length) {
        row.push(str[index] as string);
      } else {
        // Handle cases where index is out of bounds (optional)
        row.push(""); // You can push any default value here
      }
    }
    boxValues.push(row);
  }

  return boxValues;
}

const boxIndexes2 = [
  [0, 1, 4, 5],
  [2, 3, 6, 7],
  [8, 9, 12, 13],
  [10, 11, 14, 15],
];

const str = "1268341223414124";
const boxValues = getBoxValues(boxIndexes2, str);

console.log(boxValues);
