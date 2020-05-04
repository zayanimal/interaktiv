import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { systemActions } from '@system/store/actions';
import { requestActions }  from '@customer/store/actions';
import { requestSelectors } from '@customer/store/selectors'
import { rootStateTypes } from '@system/store/roots';
import { RequestTable } from '@customer/components/RequestTable';
import { RequestPartnumbers } from '@customer/components/RequestPartnumbers';
import { bem } from '@utils/formatters';
import './Request.scss';

const cn = bem('Request');

const mapStateToProps = (state: rootStateTypes) => ({
    rate: requestSelectors.rate(state),
    modelsData: requestSelectors.modelsData(state),
    modelsDataInOrder: requestSelectors.modelsDataInOrder(state),
    modelsSelected: requestSelectors.modelsSelected(state),
    listState: requestSelectors.listState(state)
});

const mapDispatchToProps = {
    fetchPrice: requestActions.fetchPriceList.request,
    setSelectedModels: requestActions.setSelectedModels,
    cleanPrice: requestActions.cleanPriceList,
    putModelInOrder: requestActions.putModelInOrder,
    deleteModelInOrder: requestActions.deleteModelInOrder,
    updateModelInOrder: requestActions.updateModelInOrder,
    setHeaderTitle: systemActions.setHeaderTitle,
    showList: requestActions.showList
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Request: React.FC<Props> = props => {
    const {
        fetchPrice,
        modelsSelected,
        setSelectedModels,
        cleanPrice,
        rate,
        modelsData,
        modelsDataInOrder,
        putModelInOrder,
        deleteModelInOrder,
        updateModelInOrder,
        setHeaderTitle,
        listState,
        showList
    } = props;

    useEffect(() => {
        fetchPrice();
        setHeaderTitle('Новый проект');

        return () => { cleanPrice() };
    }, [fetchPrice, cleanPrice, setHeaderTitle]);

    const orderHandler = (value: string | null): void => {
        if (modelsDataInOrder.some(v => v.model === value)) return;

        putModelInOrder({
            ...Object.assign({}, modelsData.find(v => v.model === value)),
            count: 1
        });
    };

    const deleteHandler = (value: string) => {
        deleteModelInOrder(modelsDataInOrder.filter(v => v.model !== value));
    };

    return (
        <div className={cn('select')}>
            <div className={cn('col1')}>
                <RequestPartnumbers
                    selected={modelsSelected}
                    setSelected={setSelectedModels}
                    models={modelsData}
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
            </div>
        </div>
    );
};

const RequestConncted = connect(mapStateToProps, mapDispatchToProps)(Request);

export { RequestConncted as Request };
