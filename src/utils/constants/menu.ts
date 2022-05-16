import { MenuType, SidebarMenuType } from "utils/types/routingConfig";
import { t } from "services/Translation";

const adminMenu = [
  { key: "systemDistributors", name: t("Distributors") },
  { key: "systemResellers", name: t("Resellers") },
  { key: "systemTenants", name: t("Tenants") },
  { key: "systemRatePlan", name: t("Rate plan") },
];

const distributorMenu = [
  { key: "distributorResellers", name: t("Resellers") },
  { key: "distributorTenants", name: t("Tenants") },
  { key: "distributorLicenseConsumption", name: t("License Consumption") },
  { key: "distributorRatePlan", name: t("Rate Plan") },
  { key: "distributorAdmins", name: t("Users") },
  { key: "distributorProfile", name: t("Profile") },
];

const resellerMenu = [
  { key: "resellerTenants", name: t("Tenants") },
  { key: "resellerLicenseConsumption", name: t("License Consumption") },
  { key: "resellerRatePlan", name: t("Rate Plan") },
  { key: "resellerAdmins", name: t("Users") },
  { key: "resellerProfile", name: t("Profile") },
];

const tenantMenu = [
  {
    key: "tenantSubscriptions",
    name: t("Subscription"),
    // rule: "tenants.instance.subscriptions.list",
  },
  {
    key: "tenantLocations",
    name: t("Locations"),
    // rule: "tenants.instance.locations.list",
  },
  {
    key: "tenantRatePlan",
    name: t("Rate Plan"),
    // rule: "tenants.instance.rate_plan.read",
  },
  // { key: "tenantAdmins", name: "Admins" },
  {
    key: "tenantProfile",
    name: t("Profile"),
    // rule: "tenants.instance.read"
  },
];

const subscriptionMenu = [
  {
    key: "subscriptionLicenses",
    name: t("Licenses"),
    // rule: "tenants.instance.subscriptions.licenses.list",
  },
  { key: "subscriptionNumbers", name: t("Numbers") },
  { key: "subscriptionMSTeams", name: t("MS Teams") },
  { key: "subscriptionSIPTrunks", name: t("SIP Trunks") },
  { key: "subscriptionProfile", name: t("Profile") },
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
    subscription: subscriptionMenu,
  },
  reseller: {
    tenant: tenantMenu,
    subscription: subscriptionMenu,
  },
  tenant: {
    subscription: subscriptionMenu,
  },
  subscription: {},
};
