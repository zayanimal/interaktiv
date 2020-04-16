import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '@actions/projectRequest.actions';
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
    Grid } from '@material-ui/core';
import PartnumbersList from '@components/PartnumbersList';

const mapStateToProps = (state: rootStateTypes) => ({
    modelsData: state.projectRequest.modelsData
});

const mapDispatchToProps = {
    fetchPrice: actions.fetchPriceList.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ProjectRequest: React.FC<Props> = ({ fetchPrice, modelsData }) => {

    useEffect(() => {
        fetchPrice();
    });

    return (
        <>
            <Grid container spacing={8}>
                <Grid item xs={3}>
                    <PartnumbersList
                        models={modelsData}
                    />
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
