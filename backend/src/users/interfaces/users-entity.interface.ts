import { Permissions } from "@/auth/entities/permissions.entity";
import { Roles } from "@auth/entities/roles.entity";
import { Company } from "@company/entities/company.entity";
import { ContactUser } from "@users/entities";

export interface IUsersEntity {
    id: string;
    username: string;
    password: string;
    time: string;
    isActive: boolean;
    roleId: string;
    role: Roles;
    contactsId: string;
    contacts: ContactUser;
    companyId: string | null;
    company: Company;
    permissions: Permissions[];
}
