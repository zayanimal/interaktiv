import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '@actions/projectRequest.actions';
import { rootStateTypes } from '@store/roots';
// import { numToRub, numToUsd } from '@utils/formatters';
// import { DeleteOutline } from '@material-ui/icons';
import {
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
    Grid } from '@material-ui/core';
import ProjectRequestTable from '@components/ProjectRequestTable';
import PartnumbersList from '@components/PartnumbersList';

const mapStateToProps = (state: rootStateTypes) => ({
    rate: state.projectRequest.rate,
    modelsData: state.projectRequest.modelsData,
    modelsDataInOrder: state.projectRequest.modelsDataInOrder,
    modelsSelected: state.projectRequest.modelsSelected,
});

const mapDispatchToProps = {
    fetchPrice: actions.fetchPriceList.request,
    changePrice: actions.changePriceList,
    setSelectedModels: actions.setSelectedModels,
    cleanPrice: actions.cleanPriceList,
    putModelInOrder: actions.putModelInOrder,
    putModelInModelsData: actions.putModelInModelsData,
    putModelInModelsSelected: actions.putModelInModelsSelected,
    deleteModelInOrder: actions.deleteModelInOrder
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ProjectRequest: React.FC<Props> = ({
    fetchPrice,
    changePrice,
    modelsSelected,
    setSelectedModels,
    cleanPrice,
    rate,
    modelsData,
    modelsDataInOrder,
    putModelInOrder,
    putModelInModelsData,
    putModelInModelsSelected,
    deleteModelInOrder
}) => {

    useEffect(() => {
        fetchPrice();

        return () => { cleanPrice() };
    }, [fetchPrice, cleanPrice]);

    const orderHandler = (value: string | null): void => {
        setSelectedModels(modelsSelected.filter(v => v.model !== value));
        changePrice(modelsData.filter(v => v.model !== value));
        putModelInOrder(modelsData.find(v => v.model === value));
    };

    const deleteHandler = (value: string) => {
        const changed = modelsDataInOrder.find(v => v.model === value);
        putModelInModelsSelected(changed);
        putModelInModelsData(changed);
        deleteModelInOrder(modelsDataInOrder.filter(v => v.model !== value));
    };

    return (
        <>
            <Grid container spacing={8}>
                <Grid item xs={3}>
                    <PartnumbersList
                        selected={modelsSelected}
                        setSelected={setSelectedModels}
                        models={modelsData}
                        onPick={orderHandler}
                    />
                </Grid>
                <Grid item xs={9}>
                <ProjectRequestTable
                    rate={rate}
                    data={modelsDataInOrder}
                    onDelete={deleteHandler}
                />
                    {/* <TableContainer>
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
                                { modelsDataInOrder.map((v, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{v.model}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                size="small"
                                                type="number"
                                                className="mui-input_qty"
                                            />
                                        </TableCell>
                                        <TableCell align="center">{numToUsd(v.price)}</TableCell>
                                        <TableCell align="center">{numToRub(v.price * rate)}</TableCell>
                                        <TableCell scope="row" align="center" onClick={(e) => {
                                                e.persist();
                                                console.log(e);
                                        }}>
                                            <Button variant="contained" color="secondary" size="small">
                                                <DeleteOutline />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                    {/* <div className="controls">
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
                    </div> */}
                </Grid>
            </Grid>
        </>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectRequest);
