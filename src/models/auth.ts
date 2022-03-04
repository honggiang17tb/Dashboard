export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginValidation {
  email: string |undefined;
  password: string | undefined;
}
