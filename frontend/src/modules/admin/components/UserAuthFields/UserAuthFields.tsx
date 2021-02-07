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
import { UserControlProps } from '@admin/containers/UserControl';
import { bem } from '@utils/formatters';

const grid = bem('FlexGrid');

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
        validation,
    } = props;

    return (
        <>
            <InputLabel>Имя пользователя</InputLabel>
            <TextField
                error={!!validation.username}
                helperText={validation.username}
                className={grid('input')}
                type="text"
                value={username}
                onChange={handleInput(setUsername)}
            />
            <InputLabel>Пароль</InputLabel>
            <TextField
                error={!!validation.password}
                helperText={validation.password}
                className={grid('input')}
                type="password"
                value={password}
                onChange={handleInput(setPassword)}
            />
            <InputLabel>Роль пользователя</InputLabel>
            <Select
                className={grid('select')}
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
                className={grid('select')}
                placeholder="Права"
                value={permissions}
                multiple
                onChange={handleSelect(setPermissions)}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={grid('select-multiple')}>
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
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
