import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { bem } from '@utils/formatters';
import './Orders.scss';

const cn = bem('Orders');

const mapStateToProps = (state: RootStateTypes) => ({});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Orders: React.FC<Props> = (props) => {
    // const {} = props;

    useEffect(() => {}, []);

    return <div className={cn()}>Hello</div>;
};

const OrdersConnected = connect(mapStateToProps, mapDispatchToProps)(Orders);

export { OrdersConnected as Orders };
