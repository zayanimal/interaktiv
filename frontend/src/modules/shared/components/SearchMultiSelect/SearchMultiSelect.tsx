import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { TextField, InputLabel, Chip, ListItem } from '@material-ui/core';
import { List, ListRowRenderer } from 'react-virtualized';
import { bem } from '@utils/formatters';
import './SearchMultiSelect.scss';

const cn = bem('SearchMultiSelect');

interface Props {
    found: string[];
    selected: string[];
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
    onDelete: (value: string) => void;
    onClear: (value: any[]) => void;
}

const SearchMultiSelect: React.FC<Props> = (props) => {
    const {
        found = [],
        selected = [],
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

    const rowRenderer: ListRowRenderer = (props2) => (
        <ListItem
            button
            key={props2.key}
            style={props2.style}
            onClick={selectHandler}
        >
            {found[props2.index]}
        </ListItem>
    );

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
                    className={cn('input-field')}
                    type="text"
                    value={input}
                    onChange={changeHandler}
                />
            </div>
            {found.length ? (
                <>
                    <div id="backdrop" className={cn('backdrop')} />
                    <List
                        className={cn('list')}
                        height={120}
                        width={1}
                        rowCount={found.length}
                        rowHeight={40}
                        rowRenderer={rowRenderer}
                        containerStyle={{
                            width: '100%',
                            maxWidth: '100%',
                        }}
                        style={{
                            width: '60%',
                            outline: 'none',
                            position: 'absolute',
                        }}
                    />
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
