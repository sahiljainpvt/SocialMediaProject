export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    userId: string;
}

export interface IRegisterRequest{
    username: string;
    displayUsername: string;
    email: string;
    phoneNumber?: string;
    password: string;
    city: string;
}