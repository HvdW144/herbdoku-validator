export interface ValidatorResultTotal {
  isValid: boolean;
  messages: string[];
  /**
   * Indices of the duplicates in the input array.
   */
  duplicates: number[];
}
