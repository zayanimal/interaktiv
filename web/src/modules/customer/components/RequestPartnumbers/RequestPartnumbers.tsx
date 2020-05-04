import React, { useEffect, MouseEvent, ChangeEvent, KeyboardEvent} from 'react';
import { Subject, of } from 'rxjs';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { priceTypes } from '@customer/store/reducers/request.reducer';
import { bem } from '@utils/formatters';
import { TextField } from '@material-ui/core';
import { List, ListRowRenderer } from 'react-virtualized';
import './RequestPartnumbers.scss';

const cn = bem('RequestPartnumbers');

interface Props {
    models: priceTypes[];
    selected: priceTypes[];
    listState: boolean;
    setSelected: (value: priceTypes[]) => void;
    onPick: (value: string | null) => void;
    onShowList: (value: boolean | undefined) => void;
};

const RequestPartnumbers: React.SFC<Props> = (props) => {
    const {
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
    }, [selected, onShowList]);

    const keyHandler = (e: KeyboardEvent) => {
        if (e.keyCode === 27) onShowList(false);
    };

    const listHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        onPick(target.textContent);
    };

    const findModel$ = new Subject();

    findModel$.pipe(
        map<any, string>(e => e.target.value),
        debounceTime(300),
        switchMap((value: string) =>
            of(models.filter(({ model }) => model.includes(value.toUpperCase()) && value !== ''))
        )
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
                className={cn('list')}
            >
                {selected[index].model}
            </div>
        );
    }

    return (
        <>
            <TextField
                onKeyDown={keyHandler}
                className={cn('input')}
                size="small"
                label="Найти модель"
                variant="outlined"
                onChange={(e: ChangeEvent) => { findModel$.next(e) }}
            />
            {listState ?
                <List
                    style={{ width: '100%', outline: 'none' }}
                    className={cn('paper')}
                    height={400}
                    width={250}
                    rowCount={selected.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer}
                /> : null}
        </>
    );
};

export { RequestPartnumbers };
