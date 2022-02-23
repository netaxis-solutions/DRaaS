import { ConfigType } from "utils/types/config";

export const backupConfig: ConfigType = {
  name: "client",
  backendUrl: "https://apio1-uat.bxl.netaxis.be",
  customTranslations: false,
  apiVersion: "api/v01",
  draasInstance: "custom/draas_v1",
  languages: ["en", "de"],
  authentication: {
    keepUserLoggedIn: true,
    customLogOut: {
      enabled: false,
      route: "/forgot-password",
    },
  },
  msTeamInterval: 17000,
};
