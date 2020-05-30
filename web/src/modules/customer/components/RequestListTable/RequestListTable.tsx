import React, { useMemo } from 'react';
import MaterialTable from 'material-table';
import { Button, Chip } from '@material-ui/core';
import { bem } from '@utils/formatters';
import './RequestListTable.scss';

const cn = bem('RequestListTable');

interface Props {

};

const RequestListTable: React.SFC<Props> = (props) => {
    const {

    } = props;

    const columns = useMemo(() => {

        return [
            {
                field: 'id',
                title: 'ID'
            },
            {
                field: 'creationDate',
                title: 'Дата создания'
            },
            {
                field: 'pending',
                title: 'В ожидании'
            },
            {
                field: 'endUser',
                title: 'Заказчик'
            },
            {
                field: 'status',
                title: 'Статус',
                render: ({ status }: { status: string }) => (
                    <Chip color="primary" label={status} />
                )
            },
            {
                title: 'Действие',
                render: () => (
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                    >
                        Перейти
                    </Button>
                )
            },
        ]},
    []);

    return (
        <div className={cn()}>
            <MaterialTable
                columns={columns}
                data={[
                    {
                        id: 1,
                        creationDate: '01.01.2020',
                        pending: '11 часов',
                        endUser: 'Hellooo',
                        status: 'На обработке'
                    },
                    {
                        id: 2,
                        creationDate: '02.01.2020',
                        pending: '5 часов',
                        endUser: 'Privet',
                        status: 'На обработке'
                    }
                ]}
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
                        emptyDataSourceMessage: 'у вас нет проектов'
                    }
                }}
            />
        </div>
    );
};

export { RequestListTable };
