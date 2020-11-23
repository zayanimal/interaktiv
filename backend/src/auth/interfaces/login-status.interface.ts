export interface LoginStatus {
    username: string;
    accessToken: string;
    role: string;
    isActive: boolean;
    permissions: string[];
}
