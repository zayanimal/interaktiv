import React from 'react';
import { connect } from 'react-redux';
import { DrawerForm } from '@system/components/DrawerForm';
import { requestDrawerActions } from '@customer/store/actions';
import { requestDrawerSelectors } from '@customer/store/selectors';
import { rootStateTypes } from '@system/store/roots';
// import { bem } from '@utils/formatters';
import './RequestDrawer.scss';

// const cn = bem('RequestDrawer');

const mapStateToProps = (state: rootStateTypes) => ({
    open: requestDrawerSelectors.openDrawer(state)
});

const mapDispatchToProps = {
    showDrawer: requestDrawerActions.toggle
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestDrawer: React.SFC<Props> = (props) => {
    const { open } = props;

    return (
        <DrawerForm toggle={open}>
            helloooooo
        </DrawerForm>
    );
};

const RequestDrawerConnected = connect(mapStateToProps, mapDispatchToProps)(RequestDrawer);

export { RequestDrawerConnected as RequestDrawer };
