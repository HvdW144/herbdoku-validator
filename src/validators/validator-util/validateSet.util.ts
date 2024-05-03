export function validateSetNoDoubles(set: string[]): string[] {
  const charIndices = new Map<string, number[]>();

  set.forEach((value, index) => {
    if (!charIndices.has(value)) {
      charIndices.set(value, [index]);
    } else {
      charIndices.get(value)!.push(index);
    }
  });

  const duplicates: string[] = [];

  charIndices.forEach((indices) => {
    if (indices.length > 1) {
      indices.forEach((index) => {
        duplicates.push(index.toString());
      });
    }
  });

  return duplicates;
}
