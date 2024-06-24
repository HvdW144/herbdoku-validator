export interface KropkiDot {
  /**
   * The first index of the kropki dot. The first cell that touches the dot.
   */
  x1: number;
  /**
   * The second index of the kropki dot. The second cell that touches the dot.
   */
  x2: number;
  /**
   * The value of the kropki dot.
   * For white kropki, the difference between the two values should be this value, default is 1.
   * For black kropki, the two values should be in a ratio of this value, default is 2.
   */
  kropkiValue?: number;
  /**
   * The type of the kropki dot. Can be either `"white" (0)` or `"black" (1)`.
   */
  kropkiType: "white" | "black" | 0 | 1;
}
