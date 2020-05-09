import React from 'react';
import { connect } from 'react-redux';
import { DrawerForm } from '@system/components/DrawerForm';
import { requestDrawerActions } from '@customer/store/actions';
import { requestDrawerSelectors } from '@customer/store/selectors';
import { rootStateTypes } from '@system/store/roots';
import { bem } from '@utils/formatters';
import TextField from '@material-ui/core/TextField';
import './RequestDrawer.scss';

const cn = bem('RequestDrawer');

const mapStateToProps = (state: rootStateTypes) => ({
    open: requestDrawerSelectors.openDrawer(state)
});

const mapDispatchToProps = {
    close: requestDrawerActions.close,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestDrawer: React.SFC<Props> = (props) => {
    const { open, close } = props;

    return (
        <DrawerForm
            label="Данные о заказчике"
            toggle={open}
            onClose={close}
        >
            <div className={cn()}>
                <div className={cn('row')}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Название заказчика"
                    />
                </div>
                <div className={cn('row')}>
                    <TextField
                        size="small"
                        label="Город"
                    />
                    <TextField
                        size="small"
                        label="Дата реализации"
                    />
                </div>
                <div className={cn('row')}>
                </div>
            </div>
        </DrawerForm>
    );
};

const RequestDrawerConnected = connect(mapStateToProps, mapDispatchToProps)(RequestDrawer);

export { RequestDrawerConnected as RequestDrawer };
