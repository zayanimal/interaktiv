import React, { useMemo } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { ColumnProps } from 'react-virtualized';
import { TableRowButton } from '@system/components/TableRowButton';
import { TableVirtual } from '@system/components/TableVirtual';
import { UsersHeader } from '@admin/components/UsersHeader';
import { UsersProps } from '@admin/containers/Users';
import { bem } from '@utils/formatters';
import './UsersList.scss';

const cn = bem('UsersList');

const UsersList: React.FC<UsersProps> = (props) => {
    const {
        list,
        meta,
        removeUser,
        getList
    } = props;

    const columns: ColumnProps[] = useMemo(() => [
        {
            dataKey: 'none',
            label: '',
            width: 90,
            cellRenderer: ({ rowData }) => (
                <TableRowButton>
                    <MenuItem>Редактировать</MenuItem>
                    <MenuItem onClick={() => { removeUser(rowData.username); }}>
                        Удалить
                    </MenuItem>
                </TableRowButton>
            )
        },
        {
            dataKey: 'username',
            label: 'Имя пользователя',
            width: 300
        },
        {
            dataKey: 'role',
            label: 'Роль',
            width: 250
        },
        {
            dataKey: 'time',
            label: 'Дата создания',
            width: 250
        },
        {
            dataKey: 'active',
            label: 'Статус',
            width: 250
        }
    ], [removeUser]);

    return (
        <div className={cn()}>
            <UsersHeader />
            <TableVirtual
                list={list}
                getList={getList}
                columns={columns}
                meta={meta}
            />
        </div>
    );
};

export { UsersList };
