import type { ValidatorResult } from "../validators/validatorResult.interface";

export type ValidatorFunction<T = void> = (
  grid: Uint8Array,
  size: number,
  options: T,
) => ValidatorResult;
