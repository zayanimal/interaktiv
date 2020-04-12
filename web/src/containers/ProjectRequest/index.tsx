import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '@actions/projectRequest.actions';
import { priceTypes } from '@store/reducers/projectRequest.reducer';
import { rootStateTypes } from '@store/roots';
import { DeleteOutline } from '@material-ui/icons';
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText } from '@material-ui/core';

const mapStateToProps = (state: rootStateTypes) => ({
    modelsData: state.projectRequest.modelsData
});

const mapDispatchToProps = {
    fetchPrice: actions.fetchPriceList.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ProjectRequest: React.FC<Props> = ({ fetchPrice, modelsData }) => {
    const [selected, setSelected] = useState<priceTypes[]>([]);

    useEffect(() => {
        fetchPrice();
    });


    const findModel = (event: any) => {
        event.persist();
        const value: string = event.target.value;

        if (modelsData.length > 0) {
            setSelected(
                modelsData.filter(({model}) => model.includes(value.toUpperCase()))
            );
        }
    };

    return (
        <>
            <Grid container spacing={8}>
                <Grid item xs={3}>
                    <TextField
                        className="mui-input_model"
                        size="small"
                        label="Найти модель"
                        variant="outlined"
                        onChange={findModel}
                    />
                    <Paper hidden={selected.length < 1}>
                        <p className="indent">Выберите модель</p>
                        <List component="nav">
                                { selected.map((m, i) => (
                                    <ListItem key={i} button>
                                        <ListItemText primary={m.model} />
                                    </ListItem>
                                ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Модель</TableCell>
                                    <TableCell align="center">Кол-во</TableCell>
                                    <TableCell align="center">Цена $</TableCell>
                                    <TableCell align="center">Цена р.</TableCell>
                                    <TableCell align="center">Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>DES-1210-28/ME</TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            size="small"
                                            type="number"
                                            className="mui-input_qty"
                                        />
                                    </TableCell>
                                    <TableCell align="center">345 $</TableCell>
                                    <TableCell align="center">22 770 р.</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="secondary" size="small">
                                            <DeleteOutline />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="controls">
                        <div>
                            <Button
                                className="controls__item"
                                variant="contained"
                                color="secondary">Очистить</Button>
                            <Button
                                className="controls__item"
                                variant="contained"
                                color="secondary">Скачать</Button>
                        </div>
                        <Button
                            variant="contained"
                            disabled
                            color="primary">Запросить спец. условия</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectRequest);
