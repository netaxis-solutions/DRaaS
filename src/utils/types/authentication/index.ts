export type LoginFormTypes = {
  username: string;
  password: string;
  keepMeLoggedIn: boolean;
};

export type ForgotPasswordTypes = {
  username: string;
};

export type ResetPasswordTypes = {
  password: string;
  confirmPassword: string;
};

export type TTwoFactorAuthentication = {
  code: string;
  trust: boolean;
};
