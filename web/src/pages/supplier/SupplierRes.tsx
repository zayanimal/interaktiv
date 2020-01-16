import React, { Fragment } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid,
    Button,
    Chip
} from '@material-ui/core';

const SupplierRes: React.FC = () => (
    <Fragment>
        <div className="supplier__response-header">
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <table className="supplier__response-table">
                        <tbody>
                            <tr>
                                <td>Заказчик</td>
                                <td><Chip color="primary" className="supplier__response-chip" label="ЖК Тушино"/></td>
                            </tr>
                            <tr>
                                <td>Создано</td>
                                <td><Chip color="primary" className="supplier__response-chip" label="01.01.2019"/></td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={6}>
                    <table className="supplier__response-table">
                        <tbody>
                            <tr>
                                <td>Требуется резерв до</td>
                                <td><Chip color="primary" className="supplier__response-chip" label="15.01.2020"/></td>
                            </tr>
                            <tr>
                                <td>Номер проекта в D-Link</td>
                                <td><Chip color="primary" className="supplier__response-chip" label="15 542"/></td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </div>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Модель</TableCell>
                        <TableCell align="center">Количество</TableCell>
                        <TableCell align="center">Цена $</TableCell>
                        <TableCell align="center">Скидка %</TableCell>
                        <TableCell align="center">Номер счёта</TableCell>
                        <TableCell align="center">Итого</TableCell>
                        <TableCell align="center">Срок поставки</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>DES-1210-52</TableCell>
                        <TableCell align="center">12</TableCell>
                        <TableCell align="center">
                            <TextField
                                className="mui-input_small"
                                variant="outlined"  
                                size="small"
                                type="number"
                            />
                        </TableCell>
                        <TableCell align="center">7%</TableCell>
                        <TableCell align="center">
                            <TextField
                                className="mui-input_small"
                                variant="outlined"  
                                size="small"
                            />
                        </TableCell>
                        <TableCell align="center">1234</TableCell>
                        <TableCell align="center">
                            <TextField
                                variant="outlined"  
                                size="small"
                                type="text"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>DGS-1210-52</TableCell>
                        <TableCell align="center">8</TableCell>
                        <TableCell align="center">
                            <TextField
                                className="mui-input_small"
                                variant="outlined"  
                                size="small"
                                type="number"
                            />
                        </TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">
                            <TextField
                                className="mui-input_small"
                                variant="outlined"  
                                size="small"
                            />
                        </TableCell>
                        <TableCell align="center">1234</TableCell>
                        <TableCell align="center">
                            <TextField
                                variant="outlined"  
                                size="small"
                                type="text"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>DGS-3420-28SC</TableCell>
                        <TableCell align="center">10</TableCell>
                        <TableCell align="center">
                            <TextField
                                className="mui-input_small"
                                variant="outlined"  
                                size="small"
                                type="number"
                            />
                        </TableCell>
                        <TableCell align="center">10%</TableCell>
                        <TableCell align="center">
                            <TextField
                                className="mui-input_small"
                                variant="outlined"  
                                size="small"
                            />
                        </TableCell>
                        <TableCell align="center">1234</TableCell>
                        <TableCell align="center">
                            <TextField
                                variant="outlined"  
                                size="small"
                                type="text"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <div className="controls">
            <div>
                <Button 
                    className="controls__item"
                    variant="contained">Сохранить</Button>
            </div>
            <div>
                <Button 
                    className="controls__item"
                    variant="contained" 
                    color="secondary">Ответить</Button>
                <Button 
                    className="controls__item"
                    variant="contained" 
                    color="secondary">Скопировать</Button>
            </div>
        </div>
    </Fragment>
);

export default SupplierRes;
