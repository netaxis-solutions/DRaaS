import { AnyKeyStringValueObjectType } from "../common";

export type GetRoutesType = (
  access: string,
  currentLevel: string,
) => Map<string, string>;

export type UrlStartStringType = {
  system: {
    system: string;
    distributor: string;
    reseller: string;
    tenant: string;
    subscription: string;
  };
  distributor: {
    distributor: string;
    reseller: string;
    tenant: string;
    subscription: string;
  };
  reseller: {
    reseller: string;
    tenant: string;
    subscription: string;
  };
  tenant: {
    tenant: string;
    subscription: string;
  };
  subscription: {
    subscription: string;
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
  system: { key: string; name: string }[];
  distributor: { key: string; name: string }[];
  reseller: { key: string; name: string }[];
  tenant: { key: string; name: string }[];
  subscription: { key: string; name: string }[];
};

export type InnerSidebarMenu = {
  distributor?: { key: string; name: string }[];
  reseller?: { key: string; name: string }[];
  tenant?: { key: string; name: string }[];
  subscription?: { key: string; name: string }[];
};

export type SidebarMenuType = {
  system: InnerSidebarMenu;
  distributor: InnerSidebarMenu;
  reseller: InnerSidebarMenu;
  tenant: InnerSidebarMenu;
  subscription: InnerSidebarMenu;
};

export type HomeUrl = {
  system: string;
  distributor: string;
  reseller: string;
  tenant: string;
  subscription: string;
};

export type LoggedInUserType =
  | "system"
  | "distributor"
  | "reseller"
  | "tenant"
  | "subscription";

export type RoutingConfigType = {
  system: {
    systemTenants: { enabled: boolean };
    systemDistributors: { enabled: boolean };
    systemRatePlan: { enabled: boolean };
    systemResellers: { enabled: boolean };
  };
  distributor: {
    distributorAdmins: { enabled: boolean };
    distributorTenants: { enabled: boolean };
    distributorLicenseConsumption: { enabled: boolean };
    distributorProfile: { enabled: boolean };
    distributorRatePlan: { enabled: boolean };
    distributorResellers: { enabled: boolean };
  };
  reseller: {
    resellerAdmins: { enabled: boolean };
    resellerTenants: { enabled: boolean };
    resellerLicenseConsumption: { enabled: boolean };
    resellerProfile: { enabled: boolean };
    resellerRatePlan: { enabled: boolean };
  };
  tenant: {
    tenantAdmins: { enabled: boolean };
    tenantLocations: { enabled: boolean };
    tenantProfile: { enabled: boolean };
    tenantRatePlan: { enabled: boolean };
    tenantSubscriptions: { enabled: boolean };
  };
  subscription: {
    subscriptionLicenses: { enabled: boolean };
  };
};

export type CurRoute = {
  key: string;
  value: RouteValueType | { path: string };
  rule?: string;
};

export type GetALlPossibleUrlsType = ({
  publicConfigRoutes,
  loggedInUserLevel,
}: {
  publicConfigRoutes: RoutingConfigType;
  loggedInUserLevel: LoggedInUserType;
}) => AnyKeyStringValueObjectType;

export type SidebarUnitType = {
  key: string;
  name: string;
};
