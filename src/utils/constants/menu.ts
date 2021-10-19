export type MenuType = {
  admin: { key: string, name: string }[];
  distributor: { key: string, name: string }[];
};

export const menu: MenuType = {
  admin: [
    { key: "adminCatalogue", name: "Catalogue" },
    { key: "adminBilling", name: "Billing" },
  ],
  distributor: [
    { key: "distributorCatalogue", name: "Catalogue" },
    { key: "distributorBilling", name: "Billing" },
  ],
};

export const sidebarLevelMenus = {
  admin: {
    admin: [{ key: "adminCatalogue", name: "Catalogue" }],
    distributor: [
      { key: "distributorCatalogue", name: "Catalogue" },
      { key: "distributorBilling", name: "Billing" },
    ],
  },
  distributor: {
    distributor: [
      { key: "distributorCatalogue", name: "Catalogue" },
      { key: "distributorBilling", name: "Billing" },
    ],
  },
};
