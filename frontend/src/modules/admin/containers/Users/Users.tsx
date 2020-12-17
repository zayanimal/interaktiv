import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    useRouteMatch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { systemActions, dictionaryActions } from '@system/store/actions';
import { usersActions, userControlActions } from '@admin/store/actions';
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
    getDictionary: dictionaryActions.getDictionary,
    clearDictionary: dictionaryActions.clearDictionary,
    getUser: userControlActions.getUser.request,

};

export type UsersProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Users: React.FC<UsersProps> = (props) => {
    const {
        setHeaderTitle,
        getList,
        meta,
        getDictionary,
        clearDictionary,
        setUserEditMode,
        getUser,
    } = props;

    const { pathname } = useLocation();
    const { path, params } = useRouteMatch<{ user: string }>();

    useEffect(() => {
        getDictionary(['roles', 'permissions']);

        if (pathname === '/users') {
            setHeaderTitle('Управление пользователями');

            if (!meta.currentPage) { getList(1); }
        }

        if (pathname.includes('/users/edit')) {
            // getUser(params.user);
            console.log(params);
            setHeaderTitle('Редактирование пользователя');
            setUserEditMode(true);
        } else if (pathname !== '/users') {
            setHeaderTitle('Добавление пользователя');
            setUserEditMode(false);
        }

        return () => { clearDictionary(); };
    }, [
        getList,
        setHeaderTitle,
        pathname,
        meta,
        getDictionary,
        clearDictionary,
        path,
        setUserEditMode,
        getUser,
        params,
    ]);

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
