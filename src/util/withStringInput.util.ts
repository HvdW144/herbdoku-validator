import type {
  ValidatorFunction,
  ValidatorFunctionWrapper,
} from "../types/validatorFunction.type";
import type { IValidatorResult } from "../validators/validatorResult.interface";
import { stringToUint8Array } from "./stringToUint8Array.util";

/**
 * Wraps a validator function to accept both string and Uint8Array input
 * @param validator - The original validator function that expects Uint8Array
 * @returns A new validator function that accepts string | Uint8Array
 */
export function withStringInput<T = void>(
  validator: ValidatorFunction<T>,
): ValidatorFunctionWrapper<T> {
  return (
    input: string | Uint8Array,
    size: number,
    options: T,
  ): IValidatorResult => {
    // Convert string to Uint8Array if needed
    const grid =
      typeof input === "string" ? stringToUint8Array(input, size) : input;

    // Optionally validate that Uint8Array is correct length (safety check)
    if (grid.length !== size * size) {
      throw new Error(
        `Invalid grid size. Expected ${size * size} elements for a ${size}x${size} grid, but got ${grid.length}.`,
      );
    }

    return validator(grid, size, options);
  };
}
