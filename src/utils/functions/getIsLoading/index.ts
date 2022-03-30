export const getIsLoading = (
  fetchType: string,
  byFetchType: Map<string, any>,
) => {
  return byFetchType.has(fetchType)
    ? byFetchType.get(fetchType)?.size
      ? true
      : false
    : false;
};
