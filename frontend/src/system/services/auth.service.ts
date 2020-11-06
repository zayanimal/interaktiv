import { TokenService, tokenService as token } from '@system/services/token.service';

class AuthService {
    constructor(private tokenService: TokenService = token) {}

    // useAuth() {

    // }

    // authFetch() {

    // }
}

export const authService = new AuthService();
