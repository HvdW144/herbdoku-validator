export function validateSetNoDoubles(set: string[]): number[] {
  const duplicates: number[] = [];
  const firstIndices = new Uint32Array(10);
  const duplicateFlags = new Uint8Array(10);
  let seenMask = 0;

  for (let i = 0; i < set.length; i++) {
    const value = set[i];
    if (!value) continue;

    const digit = parseInt(value);
    const bit = 1 << digit;

    if (seenMask & bit) {
      if (!duplicateFlags[digit]) {
        duplicates.push(firstIndices[digit] || 0);
        duplicateFlags[digit] = 1;
      }
      duplicates.push(i);
      continue;
    }

    seenMask |= bit;
    firstIndices[digit] = i;
  }

  return duplicates;
}
