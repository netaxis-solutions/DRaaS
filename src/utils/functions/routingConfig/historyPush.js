export const historyPush = (RoutingStore, activeMenu) => {
  const route =
    RoutingStore.availableRouting.find(({ key }) => key === activeMenu)?.value
      ?.path || "/";

  RoutingStore.history?.push(route);
};
