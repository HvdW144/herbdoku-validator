//TODO: remove optional indicators (?)
export interface ValidatorResult {
  isValid: boolean;
  message?: string;
  /**
   * Indices of the duplicates in the input array.
   */
  invalidIndexes?: number[];
}
