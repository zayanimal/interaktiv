import React, { useMemo } from 'react';
import { numToRub, numToUsd } from '@utils/formatters';
import { priceTypes } from '@customer/store/reducers/request.reducer';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const RequestTable: React.SFC<{
    rate: number;
    data: priceTypes[];
    onDelete: (e: string) => void;
}> = ({ data, rate, onDelete }) => {
    const columns = useMemo(() => [
        {
            field: 'model',
            title: 'Модель'
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
            render: ({ model }: { model: string }) => (
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
    ], [rate, onDelete]);

    return (
        <MaterialTable
            columns={columns}
            data={data}
            options={{
                search: false,
                sorting: false,
                filtering: false,
                showFirstLastPageButtons: false,
                showTitle: false,
                toolbar: false,
                showEmptyDataSourceMessage: false,
                paging: false
            }}

        />
    );
};

export { RequestTable };
