import { Requests } from '@customer/store/reducers/requestsList.reducer';
import { Button, Chip } from '@material-ui/core';
import { bem } from '@utils/formatters';
import { formatDistance } from 'date-fns';
import Ru from 'date-fns/locale/ru';
import MaterialTable from 'material-table';
import React, { useMemo } from 'react';
import './RequestListTable.scss';

const cn = bem('RequestListTable');

type Status = Pick<Requests, 'status'>;
type CreationDate = Pick<Requests, 'creationDate'>;

interface Props {
    data: Requests[];
}

const stringDateReverse = (str: string) => str.split('.').reverse().join('.');
const waitingTime = (date: string) =>
    formatDistance(new Date(), new Date(stringDateReverse(date)), {
        locale: Ru
    });

const RequestListTable: React.FC<Props> = (props) => {
    const { data } = props;

    const columns = useMemo(
        () => [
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
                title: 'В ожидании',
                render: ({ creationDate }: CreationDate) =>
                    waitingTime(creationDate)
            },
            {
                field: 'endUser',
                title: 'Заказчик'
            },
            {
                field: 'status',
                title: 'Статус',
                render: ({ status }: Status) => (
                    <Chip color='primary' label={status} />
                )
            },
            {
                title: 'Действие',
                render: () => (
                    <Button variant='contained' color='secondary' size='small'>
                        Перейти
                    </Button>
                )
            }
        ],
        []
    );

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
