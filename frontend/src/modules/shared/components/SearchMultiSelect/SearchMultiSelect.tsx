import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { TextField, InputLabel, Chip, ListItem } from '@material-ui/core';
import { bem } from '@utils/formatters';
import './SearchMultiSelect.scss';

const cn = bem('SearchMultiSelect');

interface Props {
    found: string[];
    selected: string[];
    error?: string;
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
    onDelete: (value: string) => void;
    onClear: (value: any[]) => void;
}

const SearchMultiSelect: React.FC<Props> = (props) => {
    const {
        found = [],
        selected = [],
        error = '',
        onChange = () => {},
        onSelect = () => {},
        onDelete = () => {},
        onClear = () => {},
    } = props;

    const [input, setInput] = useState('');

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        onChange(e.target.value);
    };
    const selectHandler = (e: MouseEvent) => onSelect(e.currentTarget.textContent || '');
    const deleteHandler = (value: string) => () => onDelete(value);

    useEffect(() => {
        const clear = () => { setInput(''); onClear([]); }

        const handlerClick = ({ target }: Event) => {
            if ((target as HTMLElement).closest('#backdrop')) { clear(); }
        };

        const handlerKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { clear(); }
        };

        document.addEventListener('keydown', handlerKey, false);
        document.addEventListener('click', handlerClick, false);

        return () => {
            document.removeEventListener('click', handlerClick, false);
            document.removeEventListener('keydown', handlerKey, false);
        }
    }, [onChange, setInput, onClear]);

    return (
        <div className={cn()}>
            <div className={cn('input')}>
                <InputLabel>Поиск пользователя</InputLabel>
                <TextField
                    fullWidth
                    error={!!error}
                    helperText={error}
                    className={cn('input-field')}
                    type="text"
                    value={input}
                    onChange={changeHandler}
                />
            </div>
            {found.length ? (
                <>
                    <div id="backdrop" className={cn('backdrop')} />
                    <div className={cn('list')}>
                        {found.map((item) => (
                            <ListItem
                                button
                                key={item}
                                onClick={selectHandler}
                            >
                                {item}
                            </ListItem>
                        ))}
                    </div>
                </>
            ) : null}
            <div className={cn('selected')}>
                {selected.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        className={cn('chip')}
                        color="primary"
                        onDelete={deleteHandler(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export { SearchMultiSelect };
