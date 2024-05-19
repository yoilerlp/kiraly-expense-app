export const removeDuplicateByKey = <T>(data: T[], key: keyof T): T[] => {
  const ids = data.map((item) => item[key]);

  const filtered = data.filter(
    (item, index) => !ids.includes(item[key], index + 1)
  );

  return filtered;
};

