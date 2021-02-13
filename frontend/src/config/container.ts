import * as System from '@system/services';
import * as Admin from '@admin/services';

const tokenService = new System.TokenService();
const restService = new System.RestService(tokenService);

export const dependencies = {
    rest: restService,
    token: tokenService,
    router: new System.RouterService(),
    validation: new System.ValidationService(),
    dictionary: new System.DictionaryService(restService),
    users: new Admin.UsersService(restService),
    company: new Admin.CompanyService(restService)
};

export type Dependencies = typeof dependencies;
