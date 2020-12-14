import React from 'react';
import { Input, InputLabel } from '@material-ui/core';
import { handleInput } from '@utils/handlers';
import { cn, UserControlProps } from '@admin/containers/UserControl';

const UserContactsFields: React.FC<UserControlProps> = (props) => {
    const {
        email,
        setEmail,
        phone,
        setPhone,
        position,
        setPosition,
    } = props;

    return (
        <>
            <InputLabel>Почта</InputLabel>
            <Input
                className={cn('input')}
                type="email"
                value={email}
                onChange={handleInput(setEmail)}
            />
            <InputLabel>Телефон</InputLabel>
            <Input
                className={cn('input')}
                type="text"
                value={phone}
                onChange={handleInput(setPhone)}
            />
            <InputLabel>Должность</InputLabel>
            <Input
                className={cn('input')}
                type="text"
                value={position}
                onChange={handleInput(setPosition)}
            />
        </>
    );
};

export { UserContactsFields };
