export interface IUser {
    username: string;
    password?: string;
}

export interface IAuthToken extends IUser{
    userId: number;
    iat: number;
    exp: number;
}