import React, { useEffect, MouseEvent, ChangeEvent } from 'react';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { priceTypes } from '@customer/store/reducers/request.reducer';
import { bem } from '@utils/formatters';
import { TextField } from '@material-ui/core';
import { List, ListRowRenderer } from 'react-virtualized';
import './RequestPartnumbers.scss';

const cn = bem('RequestPartnumbers');

interface Props {
    partnumber: string;
    models: priceTypes[];
    selected: priceTypes[];
    listState: boolean;
    setPartnumber: (value: string) => void;
    setSelected: (value: priceTypes[]) => void;
    onPick: (value: string | null) => void;
    onShowList: (value: boolean | undefined) => void;
};

const RequestPartnumbers: React.SFC<Props> = (props) => {
    const {
        partnumber,
        setPartnumber,
        models,
        listState,
        onShowList,
        onPick,
        selected,
        setSelected
    } = props;

    useEffect(() => {
        if (selected.length > 0) {
            onShowList(true);
        } else {
            onShowList(false);
        }

        const keyHandler = (e: KeyboardEvent) => {
            if (e.keyCode === 27) onShowList(false);
        };

        document.addEventListener("keydown", keyHandler, false);

        return () => {
          document.removeEventListener("keydown", keyHandler, false);
        };
    }, [selected, onShowList]);

    const listHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        onPick(target.textContent);
    };

    const findModel$ = new Subject<string>();

    findModel$.pipe(
        map(v => v.trim()),
        tap(setPartnumber),
        map(value => models.filter(({ model }) => model.includes(value.toUpperCase()) && value !== '')),
    ).subscribe(setSelected);

    const rowRenderer: ListRowRenderer = (props) => {
        const {
            key,
            index,
            style
        } = props;

        return (
            <div
                key={key}
                style={style}
                onClick={listHandler}
                className={cn('item')}
            >
                {selected[index].model}
            </div>
        );
    }

    return (
        <>
            <TextField
                className={cn('input')}
                size="small"
                label="Найти модель"
                variant="outlined"
                value={partnumber}
                onChange={(e: ChangeEvent) => {
                    const target = e.target as HTMLInputElement;
                    findModel$.next(target.value);
                }}
            />
            {listState &&
                <List
                    style={{ width: '100%', outline: 'none' }}
                    className={cn('paper')}
                    height={400}
                    width={250}
                    rowCount={selected.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer}
                />
            }
        </>
    );
};

export { RequestPartnumbers };
