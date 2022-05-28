// Here are the various functions that filter fields from objects

// This function used to filter out all fields that have falsy value
export const filterFalsyValues = <T>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value),
  ) as Partial<T>;
};

// This function used to filter out all fields that have empty string("") value
export const filterEmptyStringValues = <T>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value === ""),
  ) as Partial<T>;
};
