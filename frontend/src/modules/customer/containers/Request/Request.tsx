import { RequestPartnumbers } from '@customer/components/RequestPartnumbers';
import { RequestTable } from '@customer/components/RequestTable';
import { RequestDrawer } from '@customer/containers/RequestDrawer';
import { requestActions, requestDrawerActions } from '@customer/store/actions';
import { requestDrawerSelectors, requestSelectors } from '@customer/store/selectors';
import { Button } from '@material-ui/core';
import { systemActions } from '@system/store/actions';
import { RootStateTypes } from '@config/roots';
import { bem } from '@utils/formatters';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Request.scss';

const cn = bem('Request');

const mapStateToProps = (state: RootStateTypes) => ({
    rate: requestSelectors.rate(state),
    modelInputValue: requestSelectors.modelInputValue(state),
    modelsData: requestSelectors.modelsData(state),
    modelsDataInOrder: requestSelectors.modelsDataInOrder(state),
    modelsSelected: requestSelectors.modelsSelected(state),
    listState: requestSelectors.listState(state),
    validation: requestDrawerSelectors.validation(state),
});

const mapDispatchToProps = {
    fetchPrice: requestActions.fetchPriceList.request,
    sendNewProject: requestActions.sendNewProject,
    setModelInputValue: requestActions.setModelInputValue,
    filterModels: requestActions.filterModels,
    cleanPrice: requestActions.cleanPriceList,
    putModelInOrder: requestActions.putModelInOrder,
    deleteModelInOrder: requestActions.deleteModelInOrder,
    updateModelInOrder: requestActions.updateModelInOrder,
    setHeaderTitle: systemActions.setHeaderTitle,
    showList: requestActions.showList,
    showDrawer: requestDrawerActions.open,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Request: React.FC<Props> = (props) => {
    const {
        fetchPrice,
        sendNewProject,
        modelsSelected,
        modelInputValue,
        setModelInputValue,
        filterModels,
        cleanPrice,
        rate,
        modelsData,
        modelsDataInOrder,
        putModelInOrder,
        deleteModelInOrder,
        updateModelInOrder,
        setHeaderTitle,
        listState,
        showList,
        showDrawer,
        validation,
    } = props;

    useEffect(() => {
        fetchPrice();
        setHeaderTitle('Новый проект');

        return () => { cleanPrice(); };
    }, [fetchPrice, cleanPrice, setHeaderTitle]);

    const orderHandler = (value: string | null): void => {
        if (modelsDataInOrder.some(({ model }) => model === value)) return;

        putModelInOrder({
            // eslint-disable-next-line prefer-object-spread
            ...Object.assign({}, modelsData.find(({ model }) => model === value)),
            count: 1,
        });
    };

    const deleteHandler = (value: string) => {
        deleteModelInOrder(modelsDataInOrder.filter(({ model }) => model !== value));
    };

    return (
        <>
            <div className={cn()}>
                <div className={cn('col1')}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onClick={showDrawer}
                    >
                        Заказчик
                    </Button>
                    <RequestPartnumbers
                        value={modelInputValue}
                        setValue={setModelInputValue}
                        selected={modelsSelected}
                        filterModels={filterModels}
                        onPick={orderHandler}
                        listState={listState}
                        onShowList={showList}
                    />
                </div>
                <div className={cn('col2')}>
                    <RequestTable
                        rate={rate}
                        data={modelsDataInOrder}
                        onUpdate={updateModelInOrder}
                        onDelete={deleteHandler}
                    />
                    <div className={cn('controls')} hidden={modelsDataInOrder.length === 0}>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={!validation}
                            onClick={sendNewProject}
                        >
                            Отправить запрос
                        </Button>
                    </div>
                </div>
            </div>
            <RequestDrawer />
        </>
    );
};

const RequestConnected = connect(mapStateToProps, mapDispatchToProps)(Request);

export default RequestConnected;
