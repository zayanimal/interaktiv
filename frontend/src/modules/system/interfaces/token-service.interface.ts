export interface ITokenService {
    token: string;

    /**
     * Проверка непригодности токена
     */
    isExpired(): boolean;

    /**
     * Получить действующий токен
     */
    getToken(): string;

    /**
     * Установить токен
     * @param token новый токен
     */
    setToken(token: string): void;

    /**
     * Получить текущий статус авторизации
     */
    isLoggedIn(): boolean;

    /**
     * Удалить токен
     */
    removeToken(): void;
}
