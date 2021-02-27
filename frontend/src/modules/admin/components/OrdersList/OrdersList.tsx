import React, { useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ColumnProps } from 'react-virtualized';
import { TableRowButton } from '@shared/components/TableRowButton';
import { TableVirtual } from '@shared/components/TableVirtual';
import { ListHeader } from '@admin/components/ListHeader';
import { bem } from '@utils/formatters';
import { OrdersProps } from '@admin/containers/Orders';
import { ORDER_STATUSES } from '@admin/constants';
import './OrdersList.scss';

const cn = bem('OrdersList');

const OrdersList: React.FC<OrdersProps> = (props) => {
    const { list, meta } = props;

    const { path } = useRouteMatch();
    const history = useHistory();

    const columns: ColumnProps[] = useMemo(() => {
        interface RowData {
            id: string;
        }

        const onEdit = (rowData: RowData) => () => {};

        const onRemove = (rowData: RowData) => () => {};

        return [
            {
                dataKey: 'none',
                label: '',
                width: 90,
                cellRenderer: ({ rowData }) => (
                    <TableRowButton
                        onEdit={onEdit(rowData)}
                        onRemove={onRemove(rowData)}
                    />
                )
            },
            {
                dataKey: 'id',
                label: 'ID',
                width: 100
            },
            {
                dataKey: 'company',
                label: 'Компания',
                width: 300
            },
            {
                dataKey: 'enduser',
                label: 'Заказчик',
                width: 300
            },
            {
                dataKey: 'sum',
                label: 'Сумма',
                width: 200,
                cellRenderer: ({ cellData }) =>
                    cellData.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB'
                    })
            },
            {
                dataKey: 'created',
                label: 'Создан',
                width: 300,
                cellRenderer: ({ cellData }) =>
                    new Date(cellData).toLocaleDateString('ru')
            },
            {
                dataKey: 'status',
                label: 'Статус',
                width: 300,
                cellRenderer: ({ cellData }) => ORDER_STATUSES.get(cellData)
            }
        ];
    }, []);

    return (
        <div className={cn()}>
            <ListHeader onAction={() => {}} />
            <TableVirtual
                list={list}
                getList={() => {}}
                columns={columns}
                meta={meta}
            />
        </div>
    );
};

export { OrdersList };
