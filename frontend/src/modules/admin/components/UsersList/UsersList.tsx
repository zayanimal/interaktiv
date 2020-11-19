import React, { useMemo } from 'react';
import { TableVirtual } from '@system/components/TableVirtual';
import { UsersHeader } from '@admin/components/UsersHeader';
import { COLUMNS } from '@admin/components/UsersList/meta';
import { UsersProps } from '@admin/containers/Users';
import { bem } from '@utils/formatters';
import './UsersList.scss';

const cn = bem('UsersList');

const UsersList: React.FC<UsersProps> = (props) => {
    const { list } = props;

    const columns = useMemo(() => COLUMNS, []);

    return (
        <div className={cn()}>
            <UsersHeader />
            <TableVirtual
                columns={columns}
                list={list}
            />
        </div>
    );
};

export { UsersList };
