export interface IUser {
    profile_id: number;
    login: string;
    firstName: string;
    lastName: string;
    dateOfLoginAttempt: number;
    countOfLoginAttempts: number;
    forceChangePassword: number;
}
