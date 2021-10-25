import { AnyKeyStringValueObjectType } from "../common";

export type GetRoutesType = (
  access: string,
  currentLevel: string
) => Map<string, string>;

export type UrlStartStringType = {
  admin: {
    admin: string;
    distributor: string;
    reseller: string;
    customer: string;
  };
  distributor: {
    distributor: string;
    reseller: string;
    customer: string;
  };
  reseller: {
    reseller: string;
    customer: string;
  };
  customer: {
    customer: string;
  };
};

export type RouteValueType = {
  enabledOnClient: boolean;
  enabledOnServer: boolean;
  name: string;
  path: string | undefined;
  publicSidebar: object;
  enabled: boolean;
  sidebar: object;
};

export type RouteType = {
  value: RouteValueType;
  key: string;
};

export type MenuElement = {
  key: string;
  name: string;
  path?: string;
};

export type MenuType = {
  admin: { key: string; name: string }[];
  distributor: { key: string; name: string }[];
  reseller: { key: string; name: string }[];
  customer: { key: string; name: string }[];
};

export type InnerSidebarMenu = {
  distributor?: { key: string; name: string }[];
  reseller?: { key: string; name: string }[];
  customer?: { key: string; name: string }[];
};

export type SidebarMenuType = {
  admin: InnerSidebarMenu;
  distributor: InnerSidebarMenu;
  reseller: InnerSidebarMenu;
};

export type HomeUrl = {
  admin: string;
  distributor: string;
  reseller: string;
  customer: string;
};

export type LoggedInUserType =
  | "admin"
  | "distributor"
  | "reseller"
  | "customer";

export type RoutingConfigType = {
  admin: {
    adminCustomers: { enabled: boolean };
    adminDistributors: { enabled: boolean };
    adminRatePlan: { enabled: boolean };
    adminResellers: { enabled: boolean };
  };
  distributor: {
    distributorAdmins: { enabled: boolean };
    distributorCustomers: { enabled: boolean };
    distributorLicenseConsumption: { enabled: boolean };
    distributorProfile: { enabled: boolean };
    distributorRatePlan: { enabled: boolean };
    distributorResellers: { enabled: boolean };
  };
  reseller: {
    resellerAdmins: { enabled: boolean };
    resellerCustomers: { enabled: boolean };
    resellerLicenseConsumption: { enabled: boolean };
    resellerProfile: { enabled: boolean };
    resellerRatePlan: { enabled: boolean };
  };
  customer: {
    customerAdmins: { enabled: boolean };
    customerLocations: { enabled: boolean };
    customerProfile: { enabled: boolean };
    customerRatePlan: { enabled: boolean };
    customerSubscriptions: { enabled: boolean };
  };
};

export type CurRoute = {
  key: string;
  value: RouteValueType | { path: string };
};

export type GetALlPossibleUrlsType = ({
  publicConfigRoutes,
  loggedInUserLevel
}: {
  publicConfigRoutes: RoutingConfigType;
  loggedInUserLevel: LoggedInUserType;
}) => AnyKeyStringValueObjectType;

export type SidebarUnitType = {
  key: string;
  name: string;
};
