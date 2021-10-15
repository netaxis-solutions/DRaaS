export const customizer = (objVal: unknown, srcVal: unknown) => {
  if (Array.isArray(objVal) && Array.isArray(srcVal)) {
    return srcVal;
  }
  if (
    srcVal &&
    typeof srcVal === "object" &&
    Object.keys(srcVal).length === 0
  ) {
    return srcVal;
  }
  return undefined;
};
