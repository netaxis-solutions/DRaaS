import get from 'lodash/get';

import Route from 'storage/models/Route';
import { privateRoutes, urlStartString } from 'utils/constants/routes';
import { GetRoutesType } from 'utils/types/routingConfig';

export const getLevelRoutes: GetRoutesType = (access, currentLevel) =>
  Object.keys(privateRoutes).reduce(
    (prev: Map<string, string>, cur: string) => {
      const curUrlStart = get(
        urlStartString,
        `${access}.${currentLevel}`,
        null
      );
      if (curUrlStart) {
        cur.includes(currentLevel) &&
          prev.set(cur, `${curUrlStart}${privateRoutes[cur]}`);
      }
      return prev;
    },
    new Map()
  );

export const getAvailableRoutes: (
  publicConfigRoutes: { [key: string]: { enabled: true; sidebar?: object } },
  levelRoutes: Map<string, string>
) => Map<string, object> = (publicConfigRoutes, levelRoutes) => {
  const availableRouting = new Map();

  for (const publicRoute in publicConfigRoutes) {
    const route = levelRoutes.get(publicRoute);

    availableRouting.set(
      publicRoute,
      new Route(
        publicConfigRoutes[publicRoute].enabled,
        publicConfigRoutes[publicRoute]?.sidebar || null,
        route,
        publicRoute
      )
    );
  }
  return availableRouting;
};
