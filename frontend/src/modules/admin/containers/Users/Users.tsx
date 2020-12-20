import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    useRouteMatch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { systemActions } from '@system/store/actions';
import { usersActions } from '@admin/store/actions';
import { userSelectors } from '@admin/store/selectors';
import { UsersList } from '@admin/components/UsersList';
import { UserControl } from '@admin/containers/UserControl';

const mapStateToProps = (state: RootStateTypes) => ({
    list: userSelectors.list(state),
    meta: userSelectors.meta(state),
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getList: usersActions.getUsersList.request,
    removeUser: usersActions.removeUser,
    setUserEditName: usersActions.setUserEditName,
    setUserEditMode: usersActions.setUserEditMode,

};

export type UsersProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Users: React.FC<UsersProps> = (props) => {
    const { setHeaderTitle, getList, meta} = props;
    const { pathname } = useLocation();
    const { path } = useRouteMatch();

    useEffect(() => {
        if (pathname === '/users') {
            setHeaderTitle('Управление пользователями');

            if (!meta.currentPage) { getList(1); }
        }
    }, [getList, setHeaderTitle, pathname, meta]);

    return (
        <Switch>
            <Route path={`${path}/add`} component={UserControl} />
            <Route path={`${path}/edit/:user`} component={UserControl} />
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
