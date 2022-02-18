export type ConfigType = {
  name: string;
  customTranslations: boolean;
  backendUrl: string;
  lng?: string;
  apiVersion: string;
  draasInstance: string;
  languages: string[];
  authentication: {
    keepUserLoggedIn: boolean;
    customLogOut: {
      enabled: boolean;
      route: string;
    };
  };
  msTeamInterval: number;
};
