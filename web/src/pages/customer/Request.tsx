import React, { Fragment } from 'react';
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
    ListItemText
} from '@material-ui/core';

const Request: React.FC = () => (
    <Fragment>
        <Grid container spacing={8}>
            <Grid item xs={3}>
                <TextField 
                    className="mui-input_model"
                    size="small"
                    label="Найти модель"
                    variant="outlined"
                />
                <p className="indent">Выберите модель</p>
                <Paper>
                    <List component="nav">
                        <ListItem button>
                            <ListItemText primary="DES-1210-28"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="DES-3200-28"/>
                        </ListItem>
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
                                <TableCell align="center">Доступно</TableCell>
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
                                <TableCell align="center">5 шт.</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary" size="small">
                                        <DeleteOutline />
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                                <TableCell align="center">5 шт.</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary" size="small">
                                        <DeleteOutline />
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                                <TableCell align="center">5 шт.</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary" size="small">
                                        <DeleteOutline />
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                                <TableCell align="center">5 шт.</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary" size="small">
                                        <DeleteOutline />
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                                <TableCell align="center">5 шт.</TableCell>
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
    </Fragment>
);


export default Request;
