import { AnyKeyStringValueObjectType as PrivateRoutesType } from "utils/types/common";
import { HomeUrl, UrlStartStringType } from "utils/types/routingConfig";

export const publicRoutes = {
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:oneTimeToken",
};

export const homeUrl: HomeUrl = {
  admin: "adminDistributors",
  distributor: "distributorResellers",
  reseller: "resellerCustomers",
  customer: "customerSubscriptions",
};
export const privateRoutes: PrivateRoutesType = {
  adminDistributors: "/distributors",
  adminResellers: "/resellers",
  adminCustomers: "/customers",
  adminRatePlan: "/rate-plan",
  distributorResellers: "/resellers",
  distributorCustomers: "/customers",
  distributorLicenseConsumption: "/license-consumption",
  distributorRatePlan: "/rate-lan",
  distributorAdmins: "/admins",
  distributorProfile: "/profile",
  resellerCustomers: "/customers",
  resellerLicenseConsumption: "/license-consumption",
  resellerRatePlan: "/rate-plan",
  resellerAdmins: "/admins",
  resellerProfile: "/profile",
  customerSubscriptions: "/subscriptions",
  customerLocations: "/locations",
  customerRatePlan: "/rate-plan",
  customerAdmins: "/admins",
  customerProfile: "/profile",
};

export const urlStartString: UrlStartStringType = {
  admin: {
    admin: "",
    distributor: "/distributors/:distributorID",
    reseller: "/distributors/:distributorID/resellers/:resellerID",
    customer:
      "/distributors/:distributorID/resellers/:resellerID/customers/:customerID",
  },
  distributor: {
    distributor: "/:distributorID",
    reseller: "/:distributorID/resellers/:resellerID",
    customer: "/:distributorID/resellers/:resellerID/customers/:customerID",
  },
  reseller: {
    reseller: "/:resellerID",
    customer: "/:resellerID/customers/:customerID",
  },
  customer: {
    customer: "/:customerID",
  },
};
