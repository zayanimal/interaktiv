import React, { useCallback } from 'react';
import {
    AutoSizer,
    List,
    ListProps,
    ListRowRenderer
} from 'react-virtualized';
import { MTableBodyRow, MaterialTableProps } from 'material-table';
import 'react-virtualized/styles.css';

interface TableVirtualBodyProps extends MaterialTableProps<any>, ListProps {
    tableHeight: number;
    headerHeight: number;
    tableWidth: number;
    scrollIndex: number;
}

export const TableVirtualBody: React.FC<TableVirtualBodyProps> = (props) => {
    const rowRenderer = useCallback(
        (rowProps: TableVirtualBodyProps): ListRowRenderer => ({ index, key, style }) => (
            <div
                key={key}
                style={{ ...style, display: 'table', tableLayout: 'fixed' }}
            >
                <MTableBodyRow
                    key={key}
                    index={index}
                    data={rowProps.renderData[index]}
                    options={rowProps.options}
                    onToggleDetailPanel={rowProps.onToggleDetailPanel}
                    icons={rowProps.icons}
                    actions={rowProps.actions}
                    components={rowProps.components}
                    columns={rowProps.columns}
                    getFieldValue={rowProps.getFieldValue}
                    onRowClick={rowProps.onRowClick}
                />
            </div>
        ), []
    );

    return (
        <tbody>
            <AutoSizer>
                {() => (
                    <List
                        rowCount={props.renderData.length}
                        height={props.tableHeight - 4 * props.headerHeight}
                        width={props.tableWidth}
                        rowHeight={50}
                        rowRenderer={rowRenderer(props)}
                        overscanRowCount={10}
                    />
                )}
            </AutoSizer>
        </tbody>
    );
};
