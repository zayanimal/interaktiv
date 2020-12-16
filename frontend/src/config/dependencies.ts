import * as System from '@system/services';
import * as Admin from '@admin/services';

const tokenService = new System.TokenService();
const restService = new System.RestService(tokenService);

export const dependencies = {
    rest: restService,
    token: tokenService,
    router: new System.RouterService(),
    dictionary: new System.DictionaryService(restService),
    users: new Admin.UsersService(restService),
};

export type Dependencies = typeof dependencies;
