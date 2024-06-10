export interface ValidatorResult {
  isValid: boolean;
  message?: string;
  /**
   * Indices of the duplicates in the input array.
   */
  duplicates?: number[];
}
