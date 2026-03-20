/**
 * Finds duplicate indexes in a set of values, ignoring falsy values.
 * @param set The array of values to check for duplicates.
 * @param offset The starting index to check from.
 * @param length The number of elements to check.
 * @returns An array of duplicate indexes.
 */
export function findDuplicateIndexes(
  set: string[] | number[] | Uint8Array,
  offset: number = 0,
  length: number = set.length,
): number[] {
  const duplicateIndexes: number[] = []; //Set isn't faster
  const firstIndices = new Uint32Array(10);
  const duplicateFlags = new Uint8Array(10);
  let seenMask = 0;

  for (let i = 0; i < length; i++) {
    const value = set[offset + i];
    if (!value) continue;

    const digit = typeof value === "number" ? value : parseInt(value);
    const bit = 1 << digit;

    if (seenMask & bit) {
      if (!duplicateFlags[digit]) {
        duplicateIndexes.push(firstIndices[digit] || 0);
        duplicateFlags[digit] = 1;
      }
      duplicateIndexes.push(i);
      continue;
    }

    seenMask |= bit;
    firstIndices[digit] = i;
  }

  return duplicateIndexes;
}
