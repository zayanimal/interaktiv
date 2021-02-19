import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { bem } from '@utils/formatters';
import './OrdersControl.scss';

const cn = bem('OrdersControl');

const mapStateToProps = (state: RootStateTypes) => ({

});

const mapDispatchToProps = {

};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const OrdersControl: React.FC<Props> = (props) => {
    const {

    } = props;

    useEffect(() => {

    }, []);

    return (
        <div className={cn()}></div>
    );
};

const OrdersControlConnected = connect(mapStateToProps, mapDispatchToProps)(OrdersControl);

export { OrdersControlConnected as OrdersControl };
