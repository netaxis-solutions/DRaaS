export const customizer = (objVal: any, srcVal: any) => {
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
