import { RequestListTable } from '@customer/components/RequestListTable';
import { requestsListActions } from '@customer/store/actions';
import { requestsListSelectors } from '@customer/store/selectors';
import { DrawerForm } from '@shared/components/DrawerForm';
import { systemActions } from '@system/store/actions';
import { RootStateTypes } from '@config/roots';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootStateTypes) => ({
    requests: requestsListSelectors.requests(state)
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getRequestsList: requestsListActions.getRequestsList.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestsList: React.FC<Props> = (props) => {
    const { setHeaderTitle, getRequestsList, requests } = props;

    useEffect(() => {
        setHeaderTitle('Мои проекты');
        getRequestsList();
    }, [setHeaderTitle, getRequestsList]);

    return (
        <>
            <RequestListTable data={requests} />
            <DrawerForm toggle={false} onClose={() => {}} />
        </>
    );
};

const RequestsListConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestsList);

export default RequestsListConnected;
