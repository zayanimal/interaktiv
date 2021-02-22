import React, { useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { ColumnProps } from 'react-virtualized';
import { TableRowButton } from '@shared/components/TableRowButton';
import { TableVirtual } from '@shared/components/TableVirtual';
import { ListHeader } from '@admin/components/ListHeader';
import { bem } from '@utils/formatters';
import { CompaniesProps } from '@admin/containers/Companies';
import './CompaniesList.scss';

const cn = bem('CompaniesList');

const CompaniesList: React.FC<CompaniesProps> = (props) => {
    const {
        list,
        meta,
        deleteCompany,
        getCompaniesList,
        setCompanyEditName,
        setFetched
    } = props;

    const { path } = useRouteMatch();
    const history = useHistory();

    const columns: ColumnProps[] = useMemo(() => {
        interface RowData {
            id: string;
            name: string;
        }

        const onEdit = (rowData: RowData) => () => {
            setCompanyEditName(rowData.name);
            history.push({ pathname: `${path}/edit/${rowData.id}` });
        };

        const onRemove = (rowData: RowData) => () => {
            deleteCompany(rowData.id);
        };

        return [
            {
                dataKey: 'none',
                label: '',
                width: 90,
                cellRenderer: ({ rowData }) => (
                    <TableRowButton>
                        <MenuItem onClick={onEdit(rowData)}>
                            Редактировать
                        </MenuItem>
                        <MenuItem onClick={onRemove(rowData)}>Удалить</MenuItem>
                    </TableRowButton>
                )
            },
            {
                dataKey: 'name',
                label: 'Название компании',
                width: 300
            },
            {
                dataKey: 'contact',
                label: 'Телефон',
                width: 300,
                cellRenderer: ({ cellData }) => cellData?.phone
            },
            {
                dataKey: 'contact',
                label: 'Сайт',
                width: 300,
                cellRenderer: ({ cellData }) => cellData?.website
            },
            {
                dataKey: 'time',
                label: 'Дата создания',
                width: 300,
                cellRenderer: ({ cellData }) =>
                    new Date(cellData).toLocaleDateString('ru')
            }
        ];
    }, [setCompanyEditName, history, path, deleteCompany]);

    return (
        <div className={cn()}>
            <ListHeader onAction={() => setFetched(true)} />
            <TableVirtual
                list={list}
                getList={getCompaniesList}
                columns={columns}
                meta={meta}
            />
        </div>
    );
};

export { CompaniesList };
