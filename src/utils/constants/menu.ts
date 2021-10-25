import { MenuType, SidebarMenuType } from "utils/types/routingConfig";

const adminMenu = [
  { key: "adminDistributors", name: "Distributors" },
  { key: "adminResellers", name: "Resellers" },
  { key: "adminCustomers", name: "Customers" },
  { key: "adminRatePlan", name: "Rate plan" },
];

const distributorMenu = [
  { key: "distributorResellers", name: "Resellers" },
  { key: "distributorCustomers", name: "Customers" },
  { key: "distributorLicenseConsumption", name: "License Consumption" },
  { key: "distributorRatePlan", name: "Rate Plan" },
  { key: "distributorAdmins", name: "Admins" },
  { key: "distributorProfile", name: "Profile" },
];

const resellerMenu = [
  { key: "resellerCustomers", name: "Customers" },
  { key: "resellerLicenseConsumption", name: "License Consumption" },
  { key: "resellerRatePlan", name: "Rate Plan" },
  { key: "resellerAdmins", name: "Admins" },
  { key: "resellerProfile", name: "Profile" },
];

const customerMenu = [
  { key: "customerSubscriptions", name: "Subscription" },
  { key: "customerLocations", name: "Locations" },
  { key: "customerRatePlan", name: "Rate Plan" },
  { key: "customerAdmins", name: "Admins" },
  { key: "customerProfile", name: "Profile" },
];

export const menu: MenuType = {
  admin: adminMenu,
  distributor: distributorMenu,
  reseller: resellerMenu,
  customer: customerMenu,
};

export const sidebarLevelMenus: SidebarMenuType = {
  admin: {
    distributor: distributorMenu,
    reseller: resellerMenu,
    customer: customerMenu,
  },
  distributor: {
    reseller: resellerMenu,
    customer: customerMenu,
  },
  reseller: {
    customer: customerMenu,
  },
};
