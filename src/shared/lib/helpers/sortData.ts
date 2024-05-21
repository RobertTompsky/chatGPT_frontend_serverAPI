export const sortNumbers = (
  numbers: number[],
  order: 'asc' | 'desc'
): number[] => {
  return numbers.sort((a, b) => {
    return order === 'asc' ? a - b : b - a;
  });
};

export const sortStrings = (
  strings: string[],
  order: 'asc' | 'desc'
): string[] => {
  return strings.sort((a, b) => {
    return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
  });
};

export const sortObjects
  = <T extends { [key: string]: number | string }>(
    objects: T[],
    field: keyof T,
    order: 'asc' | 'desc'
  ): T[] => {
    return objects.sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return order === 'asc' ? String(a[field]).localeCompare(String(b[field])) : String(b[field]).localeCompare(String(a[field]));
      } else {
        return order === 'asc' ? Number(a[field]) - Number(b[field]) : Number(b[field]) - Number(a[field]);
      }
    });
  };