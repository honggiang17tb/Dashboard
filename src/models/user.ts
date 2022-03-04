export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  profile_id: number;
  login: string;
  firstName: string;
  lastName: string;
  dateOfLoginAttempt: number;
  countOfLoginAttempts: number;
  forceChangePassword: number;
}