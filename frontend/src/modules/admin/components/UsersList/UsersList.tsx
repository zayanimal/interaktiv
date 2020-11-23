import React, { useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
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
        getList,
        setUserEditName
    } = props;

    const { path } = useRouteMatch();
    const history = useHistory();

    const columns: ColumnProps[] = useMemo(() => {
        const onEdit = (rowData: any) => () => {
            setUserEditName(rowData.username);
            history.push({ pathname: `${path}/edit` });
        };

        const onRemove = (rowData: any) => () => { removeUser(rowData.username); };

        return [
            {
                dataKey: 'none',
                label: '',
                width: 90,
                cellRenderer: ({ rowData }) => (
                    <TableRowButton>
                        <MenuItem onClick={onEdit(rowData)}>
                            Редактировать
                        </MenuItem>
                        <MenuItem onClick={onRemove(rowData)}>
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
                width: 300,
                cellRenderer: ({ cellData }) => new Date(cellData).toLocaleDateString('ru')
            },
            {
                dataKey: 'isActive',
                label: 'Статус',
                width: 250,
                cellRenderer: ({ cellData }) => (cellData ? (
                    <Chip label="Активен" size="small" color="primary" />
                ) : (
                    <Chip label="Не активен" size="small" />
                ))
            }
        ];
    }, [
        removeUser,
        path,
        history,
        setUserEditName
    ]);

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
