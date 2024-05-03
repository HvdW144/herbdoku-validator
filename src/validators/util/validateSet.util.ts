export function validateSetNoDoubles(set: string[]): string[] {
  const duplicates: string[] = [];
  const uniqueSet: string[] = [];

  set.forEach((value, index) => {
    if (uniqueSet.includes(value)) {
      duplicates.push(index.toString());
    } else {
      uniqueSet.push(value);
    }
  });

  return duplicates;
}
