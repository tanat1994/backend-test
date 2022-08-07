export interface IResponse {
    status: number,
    message?: string,
    data?: object,
    errorMessage?: string,
}

export interface IAuthResponse extends IResponse {
    password?: string;
    accessToken?: string;
}