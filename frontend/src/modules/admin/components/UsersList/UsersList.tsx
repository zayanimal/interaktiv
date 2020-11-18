import React, { useMemo } from 'react';
import MaterialTable from 'material-table';
import { UsersHeader } from '@admin/components/UsersHeader';
import { COLUMNS } from '@admin/components/UsersList/meta';
import { UsersProps } from '@admin/containers/Users';
import { bem } from '@utils/formatters';
import 'react-virtualized/styles.css';
import './UsersList.scss';

const cn = bem('UsersList');

const UsersList: React.FC<UsersProps> = (props) => {
    const { list } = props;

    const columns = useMemo(() => COLUMNS, []);

    return (
        <div className={cn()}>
            <UsersHeader />
            <MaterialTable
                columns={columns}
                data={list}
                options={{
                    search: false,
                    sorting: false,
                    filtering: false,
                    showFirstLastPageButtons: false,
                    showTitle: false,
                    toolbar: false,
                    paging: false
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'нет пользователей'
                    }
                }}
            />
        </div>
    );
};

export { UsersList };
