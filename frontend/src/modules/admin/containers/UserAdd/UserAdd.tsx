import React, { useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { rootStateTypes } from '@system/store/roots';
import { systemActions, dictionaryActions } from '@system/store/actions';
import { userAddActions } from '@admin/store/actions';
import { userAddSelectors } from '@admin/store/selectors';
import { dictionarySelectors } from '@system/store/selectors';
import {
    Button,
    Input,
    InputLabel,
    Select,
    MenuItem,
    Chip
} from '@material-ui/core';
import { bem } from '@utils/formatters';
import './UserAdd.scss';

const cn = bem('UserAdd');

const mapStateToProps = (state: rootStateTypes) => ({
    dicts: dictionarySelectors.dictionaries(state),
    username: userAddSelectors.username(state),
    password: userAddSelectors.password(state),
    role: userAddSelectors.role(state),
    permissions: userAddSelectors.permissions(state),
    validFields: userAddSelectors.validFields(state)
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getDictionary: dictionaryActions.getDictionary,
    clearDictionary: dictionaryActions.clearDictionary,
    setUsername: userAddActions.setUsername,
    setPassword: userAddActions.setPassword,
    setRole: userAddActions.setRole,
    setPermissions: userAddActions.setPermissions,
    addNewUser: userAddActions.addNewUser,
    clearUserData: userAddActions.clearUserData
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UserAdd: React.FC<Props> = (props) => {
    const {
        setHeaderTitle,
        getDictionary,
        clearDictionary,
        dicts,
        username,
        setUsername,
        password,
        setPassword,
        role,
        setRole,
        permissions,
        setPermissions,
        validFields,
        addNewUser,
        clearUserData
    } = props;

    useEffect(() => {
        getDictionary(['roles', 'permissions']);
        setHeaderTitle('Добавление пользователя');

        return () => { clearDictionary(); };
    }, [
        getDictionary,
        clearDictionary,
        setHeaderTitle
    ]);

    const history = useHistory();

    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangeSelect = (callback: (v: unknown | unknown[]) => void) => (
        event: ChangeEvent<{ value: unknown }>
    ) => callback(event.target.value);

    const onCancel = () => {
        clearUserData();
        history.push('/users');
    };

    return (
        <>
            <div className={cn()}>
                <div className={cn('column')}>
                    <h3>Аутентификация</h3>
                    <InputLabel>Имя пользователя</InputLabel>
                    <Input
                        className={cn('input')}
                        type="text"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <InputLabel>Пароль</InputLabel>
                    <Input
                        className={cn('input')}
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className={cn('column')}>
                    <h3>Привилегии</h3>
                    <InputLabel>Роль пользователя</InputLabel>
                    <Select
                        className={cn('select')}
                        value={role}
                        onChange={onChangeSelect(setRole)}
                    >
                        {dicts.roles.map(({ id, name }) => (
                            <MenuItem
                                key={id}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel>Права пользователя</InputLabel>
                    <Select
                        className={cn('select')}
                        placeholder="Права"
                        value={permissions}
                        multiple
                        onChange={onChangeSelect(setPermissions)}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={cn('select-multiple')}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                    >
                        {dicts.permissions.map(({ id, name }) => (
                            <MenuItem
                                key={id}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
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
                    disabled={validFields}
                    variant="text"
                    color="primary"
                    onClick={addNewUser}
                >
                    Добавить
                </Button>
            </div>
        </>
    );
};

const UserAddConnected = connect(mapStateToProps, mapDispatchToProps)(UserAdd);

export { UserAddConnected as UserAdd };
