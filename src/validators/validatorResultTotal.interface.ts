export interface ValidatorResultTotal {
  /**
   * Contains true when all issued checks are found valid.
   */
  isValid: boolean;
  /**
   * Contains all returned messages, like warnings, errors and further information.
   */
  messages: string[];
  /**
   * Contains all (unique) **indexes** that are found invalid by one or more of the issued checks.
   */
  invalidIndexes: number[];
}
