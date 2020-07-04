import { priceTypes } from '@customer/store/reducers/request.reducer';
import { TextField } from '@material-ui/core';
import { bem } from '@utils/formatters';
import React, { ChangeEvent, MouseEvent, useEffect } from 'react';
import { List, ListRowRenderer } from 'react-virtualized';
import './RequestPartnumbers.scss';

const cn = bem('RequestPartnumbers');

interface Props {
    value: string,
    selected: priceTypes[];
    listState: boolean;
    setValue: (value: string) => void,
    filterModels: (value: string) => void;
    onPick: (value: string | null) => void;
    onShowList: (value: boolean) => void;
}

const RequestPartnumbers: React.SFC<Props> = (props) => {
    const {
        value,
        setValue,
        listState,
        onShowList,
        onPick,
        selected,
        filterModels
    } = props;

    useEffect(() => {
        if (selected.length > 0) {
            onShowList(true);
        } else {
            onShowList(false);
        }

        const keyHandler = (e: KeyboardEvent) => {
            if (e.keyCode === 27) filterModels('');
        };

        document.addEventListener('keydown', keyHandler, false);

        return () => {
            document.removeEventListener('keydown', keyHandler, false);
        };
    }, [
        selected,
        onShowList,
        filterModels
    ]);

    const listHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        onPick(target.textContent);
    };

    const rowRenderer: ListRowRenderer = (props2) => {
        const {
            key,
            index,
            style
        } = props2;

        return (
            <option
                key={key}
                style={style}
                onClick={listHandler}
                className={cn('item')}
            >
                {selected[index].model}
            </option>
        );
    };

    return (
        <>
            <TextField
                className={cn('input')}
                size="small"
                label="Найти модель"
                variant="outlined"
                value={value}
                onChange={(e: ChangeEvent) => {
                    const target = e.target as HTMLInputElement;

                    setValue(target.value);
                    filterModels(target.value);
                }}
            />
            {listState
                && (
                    <List
                        className={cn('paper')}
                        height={400}
                        width={1}
                        rowCount={selected.length}
                        rowHeight={40}
                        rowRenderer={rowRenderer}
                        containerStyle={{
                            width: '100%',
                            maxWidth: '100%'
                        }}
                        style={{
                            width: '100%',
                            outline: 'none'
                        }}
                    />
                )}
        </>
    );
};

export { RequestPartnumbers };
