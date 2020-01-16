import React from 'react';
import Page from '../../views/Page';
import VendorRes from './VendorRes';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@material-ui/core';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

const Vendor: React.FC = () => {
    const { path } = useRouteMatch();
    
    return (
        <Page stock={true}>
            <Switch>
                <Route exact path={path}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Дата создания</TableCell>
                                    <TableCell align="center">В ожидании</TableCell>
                                    <TableCell align="center">Заказчик</TableCell>
                                    <TableCell align="center">Сумма</TableCell>
                                    <TableCell align="center">Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>123</TableCell>
                                    <TableCell align="center">01.01.2020</TableCell>
                                    <TableCell align="center">5 часов</TableCell>
                                    <TableCell align="center">ЖК Чкалов</TableCell>
                                    <TableCell align="center">11 234$</TableCell>
                                    <TableCell align="center">
                                        <Link to={`${path}/id`} className="non-decoration">
                                            <Button 
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                            >Ответить</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>123</TableCell>
                                    <TableCell align="center">02.01.2020</TableCell>
                                    <TableCell align="center">3 часа</TableCell>
                                    <TableCell align="center">Царская площадь</TableCell>
                                    <TableCell align="center">22 123$</TableCell>
                                    <TableCell align="center">
                                        <Link to={`${path}/id`} className="non-decoration">
                                            <Button 
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                            >Ответить</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>123</TableCell>
                                    <TableCell align="center">03.01.2020</TableCell>
                                    <TableCell align="center">15 часов</TableCell>
                                    <TableCell align="center">Икея</TableCell>
                                    <TableCell align="center">8 500$</TableCell>
                                    <TableCell align="center">
                                        <Link to={`${path}/id`} className="non-decoration">
                                            <Button 
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                            >Ответить</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Route>
                <Route path={`${path}/id`} component={VendorRes} />           
            </Switch>
        </Page>
    );
}

export default Vendor;
