export type BreadcrumbsInfoType = Array<{
  uuid: string;
  name: string;
}>;

export type TCustomerLevelBreadcrumbs = {
  name: string;
  disabled?: boolean;
  link?: string;
}[];
