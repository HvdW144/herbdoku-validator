export interface KropkiDot {
  /**
   * The first index of the kropki dot.
   */
  x1: number;
  /**
   * The second index of the kropki dot.
   */
  x2: number;
  /**
   * The value of the kropki dot.
   * For white kropki, the difference between the two values should be this value.
   * For black kropki, the two values should be in a ratio of this value.
   */
  kropkiValue?: number;
  /**
   * The type of the kropki dot. Can be either `"white"` or `"black"`.
   */
  kropkiType: "white" | "black";
}
