export const filteringFn = (array: string[]) => {
  const result = array.reduce((acc: string[], item: string) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);

  return result;
};
