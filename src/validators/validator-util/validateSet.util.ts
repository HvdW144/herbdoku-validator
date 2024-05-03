// export function validateSetNoDoubles(set: string[]): string[] {
//   const duplicates: string[] = [];
//   const uniqueSet: string[] = [];

//   set.forEach((value, index) => {
//     if (set.includes(value)) {
//       duplicates.push(index.toString());
//     } else {
//       uniqueSet.push(value);
//     }
//   });
//   return duplicates;
// }

export function validateSetNoDoubles(set: string[]): string[] {
  const charIndices = new Map<string, number[]>();

  // Track indices of each character
  set.forEach((value, index) => {
    if (!charIndices.has(value)) {
      charIndices.set(value, [index]);
    } else {
      charIndices.get(value)!.push(index);
    }
  });

  const duplicates: string[] = [];

  // Collect characters with multiple indices
  charIndices.forEach((indices, char) => {
    if (indices.length > 1) {
      indices.forEach((index) => {
        duplicates.push(index.toString());
      });
    }
  });

  return duplicates;
}
