export interface ValidatorResult {
  isValid: boolean;
  message?: string; //TODO: Change to string[] for multiple messages
  /**
   * Indices of the duplicates in the input array.
   */
  duplicates?: number[];
}
