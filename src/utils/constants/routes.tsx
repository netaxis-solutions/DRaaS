import { AnyKeyStringValueObjectType as PrivateRoutesType } from "utils/types/common";
import { UrlStartStringType } from "utils/types/routingConfig";

export const publicRoutes = {
  login: "/login",
};

type HomeUrl = {
  admin: string;
};

export const homeUrl: HomeUrl & PrivateRoutesType = {
  admin: "adminCatalogue",
};
export const privateRoutes: PrivateRoutesType = {
  adminCatalogue: "/catalogue",
  distributorCatalogue: "/catalogue",
  distributorBilling: "/aaaa",
};

export const urlStartString: UrlStartStringType = {
  admin: {
    admin: "/:adminId",
    distributor: "/:adminId/distributors/:distributorID",
  },
  distributor: {
    distributor: "/:distributorID",
  },
};
