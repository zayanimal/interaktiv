import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Table,
    Column,
    AutoSizer,
    InfiniteLoader,
    ColumnProps,
} from 'react-virtualized';
import { range, set, transform } from 'lodash';
import { bem } from '@utils/formatters';
import { IPaginationMeta } from '@shared/interfaces';
import 'react-virtualized/styles.css';
import './TableVirtual.scss';

const cn = bem('TableVirtual');

const getSkeleton = (columns: ColumnProps[]): [ColumnProps[], object[]] => {
    const cols = columns.map((column, idx) => transform(column, (acc, value, key) => {
        set(acc, key, value);
        set(acc, 'cellRenderer', () => (
            <div key={idx} className={cn('mock')} />
        ));

        return acc;
    }, {} as ColumnProps));

    const row = columns.reduce((acc, item) => set(acc, item.dataKey, ''), {});

    return [cols, range(10).map(() => row)];
};

interface Props {
    list: any[];
    getList: (limit: number) => void;
    columns: ColumnProps[];
    meta: IPaginationMeta;
}

const TableVirtual: React.FC<Props> = (props) => {
    const {
        list,
        getList,
        columns,
        meta: { currentPage, totalItems, totalPages },
    } = props;

    const [mockCols, mockList] = useMemo(() => getSkeleton(columns), [columns]);
    const [filledList, setFilledList] = useState([{}]);
    const [cols, setCols] = useState<ColumnProps[]>([]);

    useEffect(() => {
        setFilledList(mockList);
        setCols(mockCols);

        if (list.length) {
            setFilledList(list);
            setCols(columns);
        }
    }, [list, columns, mockList, mockCols]);

    const loadMoreRows = useCallback(() => {
        if (currentPage <= totalPages) {
            getList(currentPage + 1);
        }

        return Promise.resolve();
    }, [currentPage, totalPages, getList]);

    return (
        <div style={{ height: 'calc(100vh - 8.1992em)' }}>
            <InfiniteLoader
                isRowLoaded={({ index }) => !!filledList[index]}
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
                                rowCount={filledList.length}
                                rowGetter={({ index }) => filledList[index]}
                            >
                                {cols.map((col) => (
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
