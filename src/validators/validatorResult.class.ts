import type { IValidatorResult } from "./validatorResult.interface";

export class ValidatorResult implements IValidatorResult {
  isValid: boolean;
  messages: string[];
  invalidIndexes: Set<number>;

  constructor(
    isValid: boolean = true,
    messages: string[] = [],
    invalidIndexes: Set<number> = new Set(),
  ) {
    this.isValid = isValid;
    this.messages = messages;
    this.invalidIndexes = invalidIndexes;
  }

  /**
   * Appends another ValidatorResult to this one.
   * Mutates the current instance.
   */
  append(other: IValidatorResult): void {
    if (!other.isValid) {
      this.isValid = false;
      other.invalidIndexes.forEach((index) => this.invalidIndexes.add(index));
    }

    if (other.messages.length > 0) {
      this.messages.push(...other.messages);
    }
  }
}
