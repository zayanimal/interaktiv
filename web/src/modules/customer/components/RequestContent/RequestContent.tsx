import {
    Button,
    Chip, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import React from 'react';

const RequestContent: React.FC = () => (
    <>
        <div className="customer__header">
            <Chip className="customer__header-item" label="Запрос 123" />
            <Chip className="customer__header-item" label="ЖК Тушино" />
        </div>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Модель</TableCell>
                        <TableCell align="center">Количество</TableCell>
                        <TableCell align="center">Цена $</TableCell>
                        <TableCell align="center">Цена р.</TableCell>
                        <TableCell align="center">Срок поставки</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>DES-1210-52</TableCell>
                        <TableCell align="center">12</TableCell>
                        <TableCell align="center">1 131 $</TableCell>
                        <TableCell align="center">22 344 р.</TableCell>
                        <TableCell align="center">Из Рязани 3-4 дня</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>DGS-1210-52</TableCell>
                        <TableCell align="center">2</TableCell>
                        <TableCell align="center">2 151 $</TableCell>
                        <TableCell align="center">31 267 р.</TableCell>
                        <TableCell align="center">Из Рязани 3-4 дня</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>DGS-3420-28SC</TableCell>
                        <TableCell align="center">14</TableCell>
                        <TableCell align="center">3 211 $</TableCell>
                        <TableCell align="center">91 267 р.</TableCell>
                        <TableCell align="center">Из Рязани 3-4 дня</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <div className="controls">
            <div>
                <Button
                    className="controls__item"
                    variant="contained"
                    color="secondary"
                >
                    Скачать
                </Button>
                <Button
                    className="controls__item"
                    variant="contained"
                    color="secondary"
                >
                    Скопировать
                </Button>
            </div>
        </div>
    </>
);

export { RequestContent };
