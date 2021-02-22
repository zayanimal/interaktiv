import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ordersActions } from '@admin/store/actions';
import { ordersSelectors } from '@admin/store/selectors';
import { RootStateTypes } from '@config/roots';
import { bem } from '@utils/formatters';
import './Orders.scss';

const cn = bem('Orders');

const mapStateToProps = (state: RootStateTypes) => ({
    list: ordersSelectors.list(state),
    meta: ordersSelectors.meta(state)
});

const mapDispatchToProps = {
    getOrdersList: ordersActions.getOrdersList.request
};

type OrdersProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;

const Orders: React.FC<OrdersProps> = (props) => {
    const { getOrdersList } = props;

    useEffect(() => {
        getOrdersList(1);
    }, [getOrdersList]);

    return <div className={cn()}>Hello</div>;
};

const OrdersConnected = connect(mapStateToProps, mapDispatchToProps)(Orders);

export { OrdersConnected as Orders };
