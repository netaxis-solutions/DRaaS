export type GetRoutesType = (
  access: string,
  currentLevel: string
) => Map<string, string>;

export type UrlStartStringType = {
  admin: {
    admin: string;
    distributor: string;
  };
  distributor: {
    distributor: string;
  };
};
