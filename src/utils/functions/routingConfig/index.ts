import get from "lodash/get";

import Route from "storage/models/Route";
import { privateRoutes, urlStartString } from "utils/constants/routes";
import { AnyKeyStringValueObjectType } from "utils/types/common";
import {
  GetALlPossibleUrlsType,
  GetRoutesType,
  LoggedInUserType,
  RouteValueType,
} from "utils/types/routingConfig";

export const getLevelRoutes: GetRoutesType = (access, currentLevel) =>
  Object.keys(privateRoutes).reduce(
    (prev: Map<string, string>, cur: string) => {
      const curUrlStart = get(
        urlStartString,
        `${access}.${currentLevel}`,
        null
      );
      cur.includes(currentLevel) &&
        prev.set(cur, `${curUrlStart}${privateRoutes[cur]}`);
      return prev;
    },
    new Map()
  );

export const getAvailableRoutes: (
  publicConfigRoutes: {
    [key: string]: { enabled: boolean; sidebar?: AnyKeyStringValueObjectType };
  },
  levelRoutes: Map<string, string>
) => Map<string, RouteValueType> = (publicConfigRoutes, levelRoutes) => {
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

export const getAllAvailableRoutingUrls: (
  publicConfigRoutes: {
    [key: string]: { enabled: boolean; sidebar?: AnyKeyStringValueObjectType };
  },
  levelRoutes: Map<string, string>
) => { [key: string]: string | undefined } = (
  publicConfigRoutes,
  levelRoutes
) => {
  const obj = {} as { [key: string]: string | undefined };
  for (const publicRoute in publicConfigRoutes) {
    const route = levelRoutes.get(publicRoute);
    if (publicRoute) {
      obj[publicRoute] = route;
    }
  }
  return obj;
};
type GetUrlStartType = ({
  obj,
  urlStart,
}: {
  obj: AnyKeyStringValueObjectType;
  urlStart: LoggedInUserType;
}) => string;

export const getUrlStart: GetUrlStartType = ({ obj, urlStart }) =>
  obj[urlStart];

export const getALlPossibleUrls: GetALlPossibleUrlsType = ({
  publicConfigRoutes,
  loggedInUserLevel,
}) =>
  Object.values(publicConfigRoutes).reduce((prev, cur) => {
    Object.keys(cur).forEach((urlKey) => {
      const arr = Object.keys(
        urlStartString[loggedInUserLevel]
      ) as LoggedInUserType[];
      arr.forEach((urlStart: LoggedInUserType) => {
        urlKey.includes(urlStart) &&
          Object.assign(prev, {
            [urlKey]: `${getUrlStart({
              obj: urlStartString[loggedInUserLevel],
              urlStart,
            })}${privateRoutes[urlKey]}`,
          });
      });
    });

    return prev;
  }, {} as AnyKeyStringValueObjectType);
