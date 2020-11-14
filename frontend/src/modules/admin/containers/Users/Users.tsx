import React, { useMemo } from 'react';
// import { connect } from 'react-redux';
// import { rootStateTypes } from '@system/store/roots';
import MaterialTable from 'material-table';
import { bem } from '@utils/formatters';
import './Users.scss';

const cn = bem('Users');

// const mapStateToProps = (state: rootStateTypes) => ({

// });
// const mapStateToProps = () => ({

// });

// const mapDispatchToProps = {

// };

// type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Users: React.FC = () => {
    // const {

    // } = props;

    const columns = useMemo(() => [
        {
            field: 'user',
            title: 'Имя пользователя',
        },
        {
            field: 'role',
            title: 'Роль'
        }
    ], []);

    const data = useMemo(() => [
        {
            user: 'Вова Зайчиков',
            role: 'admin'
        }
    ], []);

    return (
        <div className={cn()}>
            <MaterialTable
                columns={columns}
                data={data}
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

// const UsersConnected = connect(mapStateToProps, mapDispatchToProps)(Users);

export { Users };
