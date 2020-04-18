import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { Subject, of } from 'rxjs';
import {
    map,
    debounceTime,
    switchMap,
} from 'rxjs/operators';
import { priceTypes } from '@store/reducers/projectRequest.reducer';
import { bem } from '@utils/formatters';
import {
    TextField,
    Paper,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import './PartnumbersList.scss';

const cn = bem('PartnumbersList');

interface Props {
    models: priceTypes[];
    onPick: (value: string | null) => void;
};

const PartnumbersList: React.SFC<Props> = ({ models, onPick }) => {
    const [selected, setSelected] = useState<priceTypes[]>([]);

    const listHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.tagName === 'NAV') return '';

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

    return (
        <>
            <TextField
                className={cn('input')}
                size="small"
                label="Найти модель"
                variant="outlined"
                onChange={(e: ChangeEvent) => findModel$.next(e)}
            />
            <Paper hidden={selected.length < 1} className={cn('paper')}>
                <List onClick={listHandler} component="nav">
                        { selected.map((m, i) => (
                            <ListItem key={i} button>
                                <ListItemText primary={m.model} />
                            </ListItem>
                        ))}
                </List>
            </Paper>
        </>
    );
};

export default PartnumbersList;
