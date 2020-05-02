import React, { useMemo } from 'react';
import MaterialTable from 'material-table';
import { numToRub, numToUsd } from '@utils/formatters';
import { priceTypes } from '@customer/store/reducers/request.reducer';
import { Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { bem } from '@utils/formatters';
import './RequestTable.scss';

const cn = bem('RequestTable');

interface Props {
    rate: number;
    data: priceTypes[];
    onDelete: (e: string) => void;
};

const RequestTable: React.SFC<Props> = props => {
    const { data, rate, onDelete } = props;
    const columns = useMemo(() => [
        {
            field: 'model',
            title: 'Модель',
            headerStyle: {
                backgroundColor: 'none'
            }
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
    ], [rate, onDelete]);

    return (
        <div className={cn()}>
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
        </div>
    );
};

export { RequestTable };
