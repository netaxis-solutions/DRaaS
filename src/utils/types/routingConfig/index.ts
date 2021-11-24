import { AnyKeyStringValueObjectType } from "../common";

export type GetRoutesType = (
  access: string,
  currentLevel: string,
) => Map<string, string>;

export type UrlStartStringType = {
  admin: {
    admin: string;
    distributor: string;
    reseller: string;
    tenant: string;
  };
  distributor: {
    distributor: string;
    reseller: string;
    tenant: string;
  };
  reseller: {
    reseller: string;
    tenant: string;
  };
  tenant: {
    tenant: string;
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
  tenant: { key: string; name: string }[];
};

export type InnerSidebarMenu = {
  distributor?: { key: string; name: string }[];
  reseller?: { key: string; name: string }[];
  tenant?: { key: string; name: string }[];
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
  tenant: string;
};

export type LoggedInUserType = "admin" | "distributor" | "reseller" | "tenant";

export type RoutingConfigType = {
  admin: {
    adminTenants: { enabled: boolean };
    adminDistributors: { enabled: boolean };
    adminRatePlan: { enabled: boolean };
    adminResellers: { enabled: boolean };
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
};

export type CurRoute = {
  key: string;
  value: RouteValueType | { path: string };
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
