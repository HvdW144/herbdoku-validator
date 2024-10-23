export interface Thermometer {
  /**
   * The indexes through which the thermometer passes, starting from the bulb.
   */
  indexes: number[];
  /**
   * The value of the thermo. This is the minimum difference between two cells in the thermo.
   * Use `0` for a slow thermo (eg. 12337).
   * Default is `1`.
   */
  thermoDifference?: number;
}
