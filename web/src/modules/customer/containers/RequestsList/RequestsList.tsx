import React, { useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { RequestContent } from '@customer/components/RequestContent';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@material-ui/core';

interface Props {
    setHeaderTitle: (v: string) => void;
};

const RequestsList: React.SFC<Props> = (props) => {
    const { setHeaderTitle } = props;
    const { path } = useRouteMatch();

    useEffect(() => { setHeaderTitle('Мои проекты') });

    return (
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
                                <TableCell align="center">Статус</TableCell>
                                <TableCell align="center">Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>123</TableCell>
                                <TableCell align="center">01.01.2020</TableCell>
                                <TableCell align="center">5 часов</TableCell>
                                <TableCell align="center">ЖК Чкалов</TableCell>
                                <TableCell align="center">
                                    <Chip color="primary" label="Обработано"/>
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`${path}/id`} className="non-decoration">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >Перейти</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>123</TableCell>
                                <TableCell align="center">02.01.2020</TableCell>
                                <TableCell align="center">3 часа</TableCell>
                                <TableCell align="center">Царская площадь</TableCell>
                                <TableCell align="center">
                                    <Chip label="В ожидании"/>
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`${path}/id`} className="non-decoration">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >Перейти</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>123</TableCell>
                                <TableCell align="center">03.01.2020</TableCell>
                                <TableCell align="center">15 часов</TableCell>
                                <TableCell align="center">Икея</TableCell>
                                <TableCell align="center">
                                    <Chip label="В ожидании"/>
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`${path}/id`} className="non-decoration">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >Перейти</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Route>
            <Route path={`${path}/id`} component={RequestContent} />
        </Switch>
    );
}

export { RequestsList };
