import React, { useMemo, useCallback, ChangeEvent } from 'react';
import MaterialTable from 'material-table';
import { Button, Input } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { numToRub, numToUsd } from '@utils/formatters';
import { priceTypesCount } from '@customer/store/reducers/request.reducer';
import { bem } from '@utils/formatters';
import './RequestTable.scss';

const cn = bem('RequestTable');

interface Props {
    rate: number;
    data: priceTypesCount[];
    onDelete: (e: string) => void;
    onUpdate: (v: priceTypesCount[]) => void;
};

const RequestTable: React.SFC<Props> = props => {
    const { data, rate, onDelete, onUpdate } = props;
    /** Material-table мутирует объекты расширяя их полем dataTable */
    const immutableData = useMemo(() => data.map(r => Object.assign({}, r)), [data]);

    const countHandler = useCallback(({ e, id }: { e: ChangeEvent, id: number; }) => {
        const target = e.target as HTMLInputElement;

        onUpdate(data.map(row => (row.id === id ? { ...row, count: +target.value } : row)));
    }, [data, onUpdate]);

    const columns = useMemo(() => [
        {
            field: 'model',
            title: 'Модель'
        },
        {
            field: 'count',
            title: 'Кол-во',
            render: ({ id, count }: { id: number; count: number; }) => (
                <Input
                    style={{ width: '40%' }}
                    type="number"
                    value={count}
                    onChange={e => { countHandler({ e, id }) }}
                />
            )
        },
        {
            field: 'price',
            title: 'Цена $',
            render: ({ price }: { price: number; }) => numToUsd(price)
        },
        {
            field: 'price',
            title: 'Цена р.',
            render: ({ price }: { price: number; }) => numToRub(price * rate)
        },
        {
            field: '',
            title: 'Действие',
            render: ({ model }: { model: string; }) => (
                <Button
                    onClick={() => onDelete(model)}
                    variant="contained"
                    color="secondary"
                    size="small"
                >
                    <DeleteOutline />
                </Button>
            )
        },
    ], [rate, onDelete, countHandler]);

    return (
        <div className={cn()}>
            <MaterialTable
                columns={columns}
                data={immutableData}
                options={{
                    search: false,
                    sorting: false,
                    filtering: false,
                    showFirstLastPageButtons: false,
                    showTitle: false,
                    toolbar: false,
                    paging: false
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'нет выбранных моделей'
                    }
                }}
            />
        </div>
    );
};

export { RequestTable };
