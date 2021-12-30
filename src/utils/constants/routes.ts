import { AnyKeyStringValueObjectType as PrivateRoutesType } from "utils/types/common";
import { HomeUrl, UrlStartStringType } from "utils/types/routingConfig";

export const publicRoutes = {
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:oneTimeToken",
  twoFactor: "/two-factor",
};

export const homeUrl: HomeUrl = {
  admin: "adminDistributors",
  distributor: "distributorResellers",
  reseller: "resellerTenants",
  tenant: "tenantSubscriptions",
  subscription: "subscriptionLicenses",
};
export const privateRoutes: PrivateRoutesType = {
  adminDistributors: "/distributors",
  adminResellers: "/resellers",
  adminTenants: "/tenants",
  adminRatePlan: "/rate-plan",
  distributorResellers: "/resellers",
  distributorTenants: "/tenants",
  distributorLicenseConsumption: "/license-consumption",
  distributorRatePlan: "/rate-lan",
  distributorAdmins: "/admins",
  distributorProfile: "/profile",
  resellerTenants: "/tenants",
  resellerLicenseConsumption: "/license-consumption",
  resellerRatePlan: "/rate-plan",
  resellerAdmins: "/admins",
  resellerProfile: "/profile",
  tenantSubscriptions: "/subscriptions",
  tenantLocations: "/locations",
  tenantRatePlan: "/rate-plan",
  tenantAdmins: "/admins",
  tenantProfile: "/profile",
  subscriptionLicenses: "/licenses",
  subscriptionNumbers: "/numbers",
  subscriptionMSTeams: "/ms-teams",
  subscriptionSIPTrunks: "/sip-trunks",
  subscriptionProfile: "/profile",
};

export const urlStartString: UrlStartStringType = {
  admin: {
    admin: "",
    distributor: "/distributors/:distributorID",
    reseller: "/distributors/:distributorID/resellers/:resellerID",
    tenant: "/tenants/:tenantID",
    subscription: "/tenants/:tenantID/subscriptions/:subscriptionID",
  },
  distributor: {
    distributor: "/:distributorID",
    reseller: "/:distributorID/resellers/:resellerID",
    tenant: "/:distributorID/resellers/:resellerID/tenants/:tenantID",
  },
  reseller: {
    reseller: "/:resellerID",
    tenant: "/:resellerID/tenants/:tenantID",
  },
  tenant: {
    tenant: "/:tenantID",
    subscription: "/:tenantID/subscriptions/:subscriptionID",
  },
  subscription: {
    subscription: "/:subscriptionID",
  },
};
