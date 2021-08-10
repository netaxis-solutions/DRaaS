export type GetRoutesType = (
  access: string,
  currentLevel: string
) => Map<any, any>;

export type UrlStartStringType = {
  admin: {
    admin: string;
    distributor: string;
  };
  distributor: {
    distributor: string;
  };
};
