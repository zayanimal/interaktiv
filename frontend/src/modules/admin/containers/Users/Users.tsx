import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    useRouteMatch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { rootStateTypes } from '@system/store/roots';
import { systemActions } from '@system/store/actions';
import { usersActions } from '@admin/store/actions';
import { userSelectors } from '@admin/store/selectors';
import { UsersList } from '@admin/components/UsersList';
import { UserAdd } from '@admin/containers/UserAdd';

const mapStateToProps = (state: rootStateTypes) => ({
    list: userSelectors.list(state)
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getList: usersActions.getUsersList.request
};

export type UsersProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Users: React.FC<UsersProps> = (props) => {
    const {
        setHeaderTitle,
        getList
    } = props;

    const { pathname } = useLocation();
    const { path } = useRouteMatch();

    useEffect(() => {
        if (pathname === '/users') {
            setHeaderTitle('Управление пользователями');
            getList(1);
        }
    }, [getList, setHeaderTitle, pathname]);

    return (
        <Switch>
            <Route path={`${path}/add`} component={UserAdd} />
            <Route
                exact
                path={path}
                render={() => (<UsersList {...props} />)}
            />
        </Switch>
    );
};

const UsersConnected = connect(mapStateToProps, mapDispatchToProps)(Users);

export { UsersConnected as Users };
