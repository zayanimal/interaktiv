import React, { useMemo, useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { rootStateTypes } from '@system/store/roots';
import { systemActions } from '@system/store/actions';
import { usersActions } from '@admin/store/actions';
import { userSelectors } from '@admin/store/selectors';
import { UsersHeader } from '@admin/components/UsersHeader';
import { UsersModal } from '@admin/components/UsersModal';
import { COLUMNS } from '@admin/containers/Users/meta';
import { bem } from '@utils/formatters';
import './Users.scss';

const cn = bem('Users');

const mapStateToProps = (state: rootStateTypes) => ({
    list: userSelectors.list(state)
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getList: usersActions.getUsersList.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Users: React.FC<Props> = (props) => {
    const {
        setHeaderTitle,
        getList,
        list
    } = props;

    useEffect(() => {
        setHeaderTitle('Управление пользователями');
        getList(1);
    }, [getList, setHeaderTitle]);

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
            <UsersModal open={false} />
        </div>
    );
};

const UsersConnected = connect(mapStateToProps, mapDispatchToProps)(Users);

export { UsersConnected as Users };
