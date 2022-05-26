export const filterFalsyValues = <T>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value),
  ) as Partial<T>;
};

export const filterEmptyStringValues = <T>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value === ""),
  ) as Partial<T>;
};
