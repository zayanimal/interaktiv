import { Exclude, Expose, Transform } from 'class-transformer';
import { groupSerial } from '@shared/utils';
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';
import { ContactUser } from '@users/entities/contact-user.entity';
import { Company } from '@company/entities/company.entity';
import { IUsersEntity } from '@users/interfaces/users-entity.interface';

export const LIST_GROUP = groupSerial('list');
export const FIND_GROUP = groupSerial('find');
export const EDIT_GROUP = groupSerial('edit');

export class UsersEntity implements IUsersEntity {
    @Expose({ groups: ['find'] })
    id!: string;

    @Expose({ groups: ['list', 'find', 'edit'] })
    username!: string;

    @Exclude()
    password!: string;

    @Expose({ groups: ['list'] })
    time!: string;

    @Expose({ groups: ['list', 'find', 'edit'] })
    isActive!: boolean;

    @Exclude()
    roleId!: string;

    @Expose({ groups: ['list', 'find', 'edit'] })
    @Transform((role: Roles) => role.name)
    role!: Roles;

    @Exclude()
    contactsId!: string;

    @Expose({ groups: ['edit'] })
    contacts!: ContactUser;

    @Expose({ groups: ['find'] })
    companyId!: string | null;

    @Exclude()
    company!: Company;

    @Expose({ groups: ['find', 'edit'] })
    @Transform((perm: Permissions[]) => perm.map(({ name }) => name))
    permissions!: Permissions[];
}
