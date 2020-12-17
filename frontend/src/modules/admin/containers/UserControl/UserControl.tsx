import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { userControlActions } from '@admin/store/actions';
import { userSelectors, userControlSelectors } from '@admin/store/selectors';
import { dictionarySelectors } from '@system/store/selectors';
import { Button } from '@material-ui/core';
import { UserAuthFields } from '@admin/components/UserAuthFields';
import { UserContactsFields } from '@admin/components/UserContactsFields';
import { Preloader } from '@system/components/Preloader';
import { bem } from '@utils/formatters';
import './UserControl.scss';

export const cn = bem('UserControl');

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
    ...userControlSelectors.validation(state)
});

const mapDispatchToProps = {
    setUsername: userControlActions.setUsername,
    setPassword: userControlActions.setPassword,
    setRole: userControlActions.setRole,
    setPermissions: userControlActions.setPermissions,
    setEmail: userControlActions.setEmail,
    setPhone: userControlActions.setPhone,
    setPosition: userControlActions.setPosition,
    addNewUser: userControlActions.addNewUser,
    editUser: userControlActions.editUser.request,
    clearUserData: userControlActions.clearUserData,
};

export type UserControlProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UserControl: React.FC<UserControlProps> = (props) => {
    const {
        loading,
        userEditMode,
        addNewUser,
        editUser,
        clearUserData,
    } = props;

    const history = useHistory();

    const onCancel = () => {
        clearUserData();
        history.push('/users');
    };

    return (userEditMode && loading ? <Preloader /> : (
        <>
            <div className={cn()}>
                <div className={cn('column')}>
                    <h3>Аутентификация</h3>
                    <UserAuthFields {...props} />
                </div>
                <div className={cn('column')}>
                    <h3>Контакты</h3>
                    <UserContactsFields {...props} />
                </div>
            </div>
            <div className={cn('controls')}>
                <Button
                    variant="text"
                    color="primary"
                    onClick={onCancel}
                >
                    Назад
                </Button>
                <Button
                    variant="text"
                    color="primary"
                    onClick={userEditMode ? editUser : addNewUser}
                >
                    {userEditMode ? 'Редактировать' : 'Добавить'}
                </Button>
            </div>
        </>
    ));
};

const UserControlConnected = connect(mapStateToProps, mapDispatchToProps)(UserControl);

export { UserControlConnected as UserControl };
