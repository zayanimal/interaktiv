import React, { useMemo } from 'react';
import { numToRub, numToUsd } from '@utils/formatters';
import { priceTypes } from '@store/reducers/projectRequest.reducer';
import { DataTable } from 'grommet/components/DataTable';
import { Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const ProjectRequestTable: React.SFC<{
    rate: number;
    data: priceTypes[];
    onDelete: (e: string) => void;
}> = ({ data, rate, onDelete }) => {
    const columns = useMemo(() => [
        {
            property: 'model',
            header: 'Модель'
        },
        {
            property: 'price',
            header: 'Цена $',
            render: ({ price }: { price: number; }) => numToUsd(price)
        },
        {
            property: 'price',
            header: 'Цена р.',
            render: ({ price }: { price: number; }) => numToRub(price * rate)
        },
        {
            header: 'Действие',
            property: '',
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
        <DataTable
            columns={columns}
            data={data}
            pad={{ vertical: 'medium' }}
            primaryKey={false}
            size="large"
        />
    );
};

export default ProjectRequestTable;
