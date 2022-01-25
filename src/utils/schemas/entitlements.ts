import { string, object } from "yup";

export const editEntitlementSchema = () =>
  object().shape({
    entitlement: string().required(),
  });
