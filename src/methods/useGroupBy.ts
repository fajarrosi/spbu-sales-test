type Key = string | number | symbol;

export const useGroupBy = <T>(array: T[], key: keyof T): Record<Key, T[]> => {
  return array.reduce((result, currentValue) => {
    const groupKey = currentValue[key] as Key;
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {} as Record<Key, T[]>);
};