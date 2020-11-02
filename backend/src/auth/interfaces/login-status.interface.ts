interface LoginSuccess {
    username: string;
    accessToken: string;
}

interface LoginError {
    status: number;
    message: string;
}

export type LoginStatus = LoginSuccess | LoginError;
