export type TCustomerLevelPayload = [
  {
    uuid: string;
    name: string;
    billingId: string;
    markup: string;
  },
  string,
];

export type TCustomerLevelBreadcrumbs = {
  name: string;
  disabled: boolean;
  link: "string";
}[];
