import { MenuType, SidebarMenuType } from "utils/types/routingConfig";

const adminMenu = [
  { key: "systemDistributors", name: "Distributors" },
  { key: "systemResellers", name: "Resellers" },
  { key: "systemTenants", name: "Tenants" },
  { key: "systemRatePlan", name: "Rate plan" },
];

const distributorMenu = [
  { key: "distributorResellers", name: "Resellers" },
  { key: "distributorTenants", name: "Tenants" },
  { key: "distributorLicenseConsumption", name: "License Consumption" },
  { key: "distributorRatePlan", name: "Rate Plan" },
  { key: "distributorAdmins", name: "Users" },
  { key: "distributorProfile", name: "Profile" },
];

const resellerMenu = [
  { key: "resellerTenants", name: "Tenants" },
  { key: "resellerLicenseConsumption", name: "License Consumption" },
  { key: "resellerRatePlan", name: "Rate Plan" },
  { key: "resellerAdmins", name: "Users" },
  { key: "resellerProfile", name: "Profile" },
];

const tenantMenu = [
  {
    key: "tenantSubscriptions",
    name: "Subscription",
    // rule: "tenants.instance.subscriptions.list",
  },
  {
    key: "tenantLocations",
    name: "Locations",
    // rule: "tenants.instance.locations.list",
  },
  {
    key: "tenantRatePlan",
    name: "Rate Plan",
    // rule: "tenants.instance.rate_plan.read",
  },
  // { key: "tenantAdmins", name: "Admins" },
  {
    key: "tenantProfile",
    name: "Profile",
    // rule: "tenants.instance.read"
  },
];

const subscriptionMenu = [
  {
    key: "subscriptionLicenses",
    name: "Licenses",
    // rule: "tenants.instance.subscriptions.licenses.list",
  },
  { key: "subscriptionNumbers", name: "Numbers" },
  { key: "subscriptionMSTeams", name: "MS Teams" },
  { key: "subscriptionSIPTrunks", name: "SIP Trunks" },
  { key: "subscriptionProfile", name: "Profile" },
];

export const menu: MenuType = {
  system: adminMenu,
  distributor: distributorMenu,
  reseller: resellerMenu,
  tenant: tenantMenu,
  subscription: subscriptionMenu,
};

export const sidebarLevelMenus: SidebarMenuType = {
  system: {
    distributor: distributorMenu,
    reseller: resellerMenu,
    tenant: tenantMenu,
    subscription: subscriptionMenu,
  },
  distributor: {
    reseller: resellerMenu,
    tenant: tenantMenu,
  },
  reseller: {
    tenant: tenantMenu,
  },
  tenant: {
    subscription: subscriptionMenu,
  },
  subscription: {},
};
