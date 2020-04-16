import React, { useState } from 'react';
import { Subject, of } from 'rxjs';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { priceTypes } from '@store/reducers/projectRequest.reducer';
import bem from '@utils/index';
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
    models: priceTypes[]
};

const PartnumbersList: React.SFC<Props> = ({ models }) => {
    const [selected, setSelected] = useState<priceTypes[]>([]);

    const findModel = new Subject();
    findModel.pipe(
        map((e: any) => {
            e.persist();
            return e.target.value;
        }),
        debounceTime(500),
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
                onChange={e => findModel.next(e)}
            />
            <Paper hidden={selected.length < 1}>
                <p className={cn('title')}>Выберите модель</p>
                <List component="nav">
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
