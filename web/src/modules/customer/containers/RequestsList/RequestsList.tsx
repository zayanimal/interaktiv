import { RequestListTable } from '@customer/components/RequestListTable';
import { requestsListActions } from '@customer/store/actions';
import { systemActions } from '@system/store/actions';
import { rootStateTypes } from '@system/store/roots';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: rootStateTypes) => ({

});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getRequestsList: requestsListActions.getRequestsList.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestsList: React.SFC<Props> = (props) => {
    const {
        setHeaderTitle,
        getRequestsList
    } = props;

    useEffect(() => {
        setHeaderTitle('Мои проекты');
        getRequestsList();
    });

    return (
        <RequestListTable />
    );
};

const RequestsListConnected = connect(mapStateToProps, mapDispatchToProps)(RequestsList);

export { RequestsListConnected as RequestsList };
