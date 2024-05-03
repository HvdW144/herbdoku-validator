export interface ValidatorResult {
  isValid: boolean;
  message?: string;
  duplicates?: string[];
}
