export type DistributorItemType = {
  [key: string]: string | number;
};

export type DistributorsDataType = {
  distributors: Array<DistributorItemType>;
  page: number;
  pages: number;
  results: number;
};
