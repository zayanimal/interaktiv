import React from 'react';
import {
    TextField,
    Input,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@material-ui/core';
import { handleInput, handleSelect } from '@utils/handlers';
import { cn, UserControlProps } from '@admin/containers/UserControl';

const UserAuthFields: React.FC<UserControlProps> = (props) => {
    const {
        dicts,
        username,
        setUsername,
        password,
        setPassword,
        role,
        setRole,
        permissions,
        setPermissions,
        errorUsername,
        errorPassword,
    } = props;

    return (
        <>
            <InputLabel>Имя пользователя</InputLabel>
            <TextField
                error={!!errorUsername}
                helperText={errorUsername}
                className={cn('input')}
                type="text"
                value={username}
                onChange={handleInput(setUsername)}
            />
            <InputLabel>Пароль</InputLabel>
            <TextField
                error={!!errorPassword}
                helperText={errorPassword}
                className={cn('input')}
                type="password"
                value={password}
                onChange={handleInput(setPassword)}
            />
            <InputLabel>Роль пользователя</InputLabel>
            <Select
                className={cn('select')}
                value={role}
                onChange={handleSelect(setRole)}
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
                onChange={handleSelect(setPermissions)}
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
        </>
    );
};

export { UserAuthFields };
