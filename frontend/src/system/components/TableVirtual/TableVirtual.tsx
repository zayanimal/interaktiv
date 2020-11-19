import React from 'react';
import MaterialTable, { Column, MTableHeader } from 'material-table';
import { TableVirtualBody } from './TableVirtualBody';
import { useDimensions } from './useDimensions';
// import { bem } from '@utils/formatters';
import './TableVirtual.scss';

// const cn = bem('TableVirtual');

interface Props {
    columns: Column<object>[];
    list: object[];
}

const TableVirtual: React.FC<Props> = (props) => {
    const {
        columns,
        list
    } = props;

    const [
        tableRef,
        { width: tableWidth, height: tableHeight }
    ] = useDimensions();

    const [tableHeaderRef, { height: tableHeaderHeight }] = useDimensions();

    return (
        <div ref={tableRef}>
            <MaterialTable
                columns={columns}
                data={list}
                options={{
                    toolbar: false,
                    paging: false,
                    sorting: false,
                    draggable: false,
                    minBodyHeight: '85vh',
                    maxBodyHeight: '85vh'
                }}
                components={{
                    Body: (tprops) => (
                        <TableVirtualBody
                            {...tprops}
                            headerHeight={tableHeaderHeight}
                            tableWidth={tableWidth}
                            tableHeight={tableHeight}
                        />
                    ),
                    Header: (hprops) => (
                        <div ref={tableHeaderRef} className="table-header-row">
                            <MTableHeader {...hprops} />
                        </div>
                    )
                }}
            />
        </div>
    );
};

export { TableVirtual };
