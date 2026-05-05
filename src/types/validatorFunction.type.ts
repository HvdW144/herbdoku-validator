import type { IValidatorResult } from "../validators/validatorResult.interface";

export type ValidatorFunction<T = void> = (
  grid: Uint8Array,
  size: number,
  options: T,
) => IValidatorResult;

export type ValidatorFunctionWrapper<T = void> = (
  grid: string | Uint8Array,
  size: number,
  options: T,
) => IValidatorResult;
