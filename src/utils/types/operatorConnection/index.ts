export type IStartOnboardingProccessData = {
  [key: string]: string;
};

export type IStartOnboardingProccess = {
  email?: string;
  msTenantId?: string;
  companyName?: string;
};

export type IOperatorConnectionStrings = keyof IStartOnboardingProccess;
