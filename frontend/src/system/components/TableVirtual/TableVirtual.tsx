import React from 'react';
import {
    Table,
    Column,
    AutoSizer,
    InfiniteLoader,
    ColumnProps,
} from 'react-virtualized';
import { bem } from '@utils/formatters';
import { IUsersMeta } from '@admin/interfaces/users.interface';
import 'react-virtualized/styles.css';
import './TableVirtual.scss';

const cn = bem('TableVirtual');

interface Props {
    list: any[];
    getList: (limit: number) => void;
    columns: ColumnProps[];
    meta: IUsersMeta;
}

const TableVirtual: React.FC<Props> = (props) => {
    const {
        list,
        getList,
        columns,
        meta: {
            currentPage,
            totalItems,
            totalPages,
        },
    } = props;

    const loadMoreRows = () => {
        if (currentPage <= totalPages) {
            getList(currentPage + 1);
        }

        return Promise.resolve();
    };

    return (
        <div style={{ height: 'calc(100vh - 8.1992em)' }}>
            <InfiniteLoader
                isRowLoaded={({ index }) => !!list[index]}
                loadMoreRows={loadMoreRows}
                rowCount={totalItems}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ width, height }) => (
                            <Table
                                className={cn()}
                                width={width}
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                headerHeight={60}
                                rowClassName={cn('row')}
                                rowHeight={60}
                                rowCount={list.length}
                                rowGetter={({ index }) => list[index]}
                            >
                                {columns.map((col) => (
                                    <Column
                                        key={col.dataKey}
                                        label={col.label}
                                        dataKey={col.dataKey}
                                        width={col.width}
                                        cellRenderer={col.cellRenderer}
                                    />
                                ))}
                            </Table>
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </div>
    );
};

export { TableVirtual };
