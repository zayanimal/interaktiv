import React from 'react';
import { TextField, InputLabel } from '@material-ui/core';
// import { List, ListRowRenderer } from 'react-virtualized';
import { bem } from '@utils/formatters';
import './SearchMultiSelect.scss';

const cn = bem('SearchMultiSelect');

interface Props {

}

const SearchMultiSelect: React.FC<Props> = (props) => {
    // const {

    // } = props;

    return (
        <div className={cn()}>
            <div className={cn('input')}>
                <InputLabel>Поиск пользователя</InputLabel>
                <TextField
                    fullWidth
                    type="text"
                    value={''}
                    onChange={() => {}}
                />
            </div>
        </div>
    );
};

export { SearchMultiSelect };
