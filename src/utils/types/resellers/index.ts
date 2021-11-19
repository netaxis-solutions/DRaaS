export type ResellerItemType = {
  [key: string]: string | number;
};

export type ResellersDataType = {
  resellers: Array<ResellerItemType>;
  page: number;
  pages: number;
  results: number;
};
