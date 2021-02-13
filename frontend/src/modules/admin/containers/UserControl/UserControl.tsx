import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { userControlActions, usersActions } from '@admin/store/actions';
import { userSelectors, userControlSelectors } from '@admin/store/selectors';
import { systemActions, dictionaryActions } from '@system/store/actions';
import { dictionarySelectors } from '@system/store/selectors';
import { Checkbox, InputLabel } from '@material-ui/core';
import { UserAuthFields } from '@admin/components/UserAuthFields';
import { UserContactsFields } from '@admin/components/UserContactsFields';
import { FormControls } from '@admin/components/FormControls';
import { Preloader } from '@system/components/Preloader';
import { bem, classes } from '@utils/formatters';
import './UserControl.scss';

const cn = bem('UserControl');
const grid = bem('FlexGrid');

const mapStateToProps = (state: RootStateTypes) => ({
    dicts: dictionarySelectors.dictionaries(state),
    loading: userControlSelectors.loading(state),
    userEditMode: userSelectors.userEditMode(state),
    userEditName: userSelectors.userEditName(state),
    username: userControlSelectors.username(state),
    password: userControlSelectors.password(state),
    role: userControlSelectors.role(state),
    permissions: userControlSelectors.permissions(state),
    email: userControlSelectors.email(state),
    phone: userControlSelectors.phone(state),
    position: userControlSelectors.position(state),
    isActive: userControlSelectors.isActive(state),
    validation: userControlSelectors.validation(state)
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getDictionary: dictionaryActions.getDictionary,
    clearDictionary: dictionaryActions.clearDictionary,
    setUserEditMode: usersActions.setUserEditMode,
    getUser: userControlActions.getUser.request,
    setUsername: userControlActions.setUsername,
    setPassword: userControlActions.setPassword,
    setRole: userControlActions.setRole,
    setPermissions: userControlActions.setPermissions,
    setEmail: userControlActions.setEmail,
    setPhone: userControlActions.setPhone,
    setPosition: userControlActions.setPosition,
    setIsActive: userControlActions.setIsActive,
    addNewUser: userControlActions.addNewUser,
    editUser: userControlActions.editUser.request,
    clearUserData: userControlActions.clearUserData
};

export type UserControlProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;

const UserControl: React.FC<UserControlProps> = (props) => {
    const {
        loading,
        setHeaderTitle,
        getDictionary,
        userEditMode,
        setUserEditMode,
        getUser,
        isActive,
        setIsActive,
        clearDictionary,
        addNewUser,
        editUser,
        clearUserData
    } = props;

    const { path, params } = useRouteMatch<{ user: string }>();

    useEffect(() => {
        getDictionary(['roles', 'permissions']);

        if (path.includes('edit')) {
            getUser(params.user);
            setHeaderTitle('Редактирование пользователя');
            setUserEditMode(true);
        } else {
            setHeaderTitle('Добавление пользователя');
            setUserEditMode(false);
        }

        return () => {
            clearDictionary();
        };
  }, []); // eslint-disable-line

    const onEdit = () => {
        editUser(params.user);
    };

    return userEditMode && loading ? (
        <Preloader />
    ) : (
        <>
            <div className={classes(grid('row'))}>
                <div className={grid('col-6')}>
                    <h3>Аутентификация</h3>
                    <UserAuthFields {...props} />
                </div>
                <div className={grid('col-6')}>
                    <h3>Контакты</h3>
                    <UserContactsFields {...props} />

                    <div className={cn('status')}>
                        <Checkbox
                            checked={isActive}
                            onChange={({ target }) =>
                                setIsActive(target.checked)
                            }
                            color='primary'
                        />
                        <InputLabel>Статус пользователя</InputLabel>
                    </div>
                </div>
            </div>
            <FormControls
                mode={userEditMode}
                backward='/users'
                onEdit={onEdit}
                onAdd={addNewUser}
                onClean={clearUserData}
            />
        </>
    );
};

const UserControlConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserControl);

export { UserControlConnected as UserControl };
