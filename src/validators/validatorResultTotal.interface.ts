export interface ValidatorResultTotal {
  isValid: boolean;
  messages: string[];
  /**
   * Indices of the invalid indexes in the input array.
   */
  invalidIndexes: number[];
}
