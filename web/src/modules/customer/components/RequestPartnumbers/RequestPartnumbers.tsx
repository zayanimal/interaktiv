import React, { useEffect, MouseEvent, ChangeEvent } from 'react';
import { Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { priceTypes } from '@customer/store/reducers/request.reducer';
import { bem } from '@utils/formatters';
import { TextField } from '@material-ui/core';
import { List, ListRowRenderer } from 'react-virtualized';
import './RequestPartnumbers.scss';

const cn = bem('RequestPartnumbers');

interface Props {
    clearPartnumber: boolean;
    models: priceTypes[];
    selected: priceTypes[];
    listState: boolean;
    clearInputPartnumber: (value: boolean) => void;
    setSelected: (value: priceTypes[]) => void;
    onPick: (value: string | null) => void;
    onShowList: (value: boolean) => void;
};

const RequestPartnumbers: React.SFC<Props> = (props) => {
    const {
        clearPartnumber,
        models,
        listState,
        onShowList,
        onPick,
        selected,
        setSelected
    } = props;

    const findModel$ = new Subject<string>();

    useEffect(() => {
        if (selected.length > 0) {
            onShowList(true);
        } else {
            onShowList(false);
        }

        const keyHandler = (e: KeyboardEvent) => {
            if (e.keyCode === 27) setSelected([]);
        };

        document.addEventListener("keydown", keyHandler, false);

        return () => {
          document.removeEventListener("keydown", keyHandler, false);
          findModel$.unsubscribe();
        };
    }, [
        selected,
        onShowList,
        findModel$,
        clearPartnumber,
        setSelected
    ]);

    const listHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        onPick(target.textContent);
    };

    findModel$.pipe(
        debounceTime(250),
        map(v => v.trim()),
        map(value => models.filter(({ model }) => model.includes(value.toUpperCase()) && value !== ''))
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
            {!clearPartnumber &&
                <TextField
                    className={cn('input')}
                    size="small"
                    label="Найти модель"
                    variant="outlined"
                    onChange={(e: ChangeEvent) => {
                        const target = e.target as HTMLInputElement;
                        findModel$.next(target.value);
                    }}
                />
            }
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
