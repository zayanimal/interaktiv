import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { systemActions } from '@system/store/actions';
import { requestActions }  from '@customer/store/actions';
import { requestSelectors } from '@customer/store/selectors'
import { rootStateTypes } from '@system/store/roots';
import { Grid } from '@material-ui/core';
import { RequestTable } from '@customer/components/RequestTable';
import { RequestPartnumbers } from '@customer/components/RequestPartnumbers';

const mapStateToProps = (state: rootStateTypes) => ({
    rate: requestSelectors.rate(state),
    modelsData: requestSelectors.modelsData(state),
    modelsDataInOrder: requestSelectors.modelsDataInOrder(state),
    modelsSelected: requestSelectors.modelsSelected(state)
});

const mapDispatchToProps = {
    fetchPrice: requestActions.fetchPriceList.request,
    changePrice: requestActions.changePriceList,
    setSelectedModels: requestActions.setSelectedModels,
    cleanPrice: requestActions.cleanPriceList,
    putModelInOrder: requestActions.putModelInOrder,
    putModelInModelsData: requestActions.putModelInModelsData,
    putModelInModelsSelected: requestActions.putModelInModelsSelected,
    deleteModelInOrder: requestActions.deleteModelInOrder,
    setHeaderTitle: systemActions.setHeaderTitle
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Request: React.FC<Props> = props => {
    const {
        fetchPrice,
        changePrice,
        modelsSelected,
        setSelectedModels,
        cleanPrice,
        rate,
        modelsData,
        modelsDataInOrder,
        putModelInOrder,
        putModelInModelsData,
        putModelInModelsSelected,
        deleteModelInOrder,
        setHeaderTitle
    } = props;

    useEffect(() => {
        fetchPrice();
        setHeaderTitle('Новый проект');

        return () => { cleanPrice() };
    }, [fetchPrice, cleanPrice, setHeaderTitle]);

    const orderHandler = (value: string | null): void => {
        setSelectedModels(modelsSelected.filter(v => v.model !== value));
        changePrice(modelsData.filter(v => v.model !== value));
        putModelInOrder(modelsData.find(v => v.model === value));
    };

    const deleteHandler = (value: string) => {
        const changed = modelsDataInOrder.find(v => v.model === value);
        putModelInModelsSelected(changed);
        putModelInModelsData(changed);
        deleteModelInOrder(modelsDataInOrder.filter(v => v.model !== value));
    };

    return (
        <>
            <Grid container spacing={8}>
                <Grid item xs={3}>
                    <RequestPartnumbers
                        selected={modelsSelected}
                        setSelected={setSelectedModels}
                        models={modelsData}
                        onPick={orderHandler}
                    />
                </Grid>
                <Grid item xs={9}>
                <RequestTable
                    rate={rate}
                    data={modelsDataInOrder}
                    onDelete={deleteHandler}
                />
                </Grid>
            </Grid>
        </>
    );
};

const RequestConncted = connect(mapStateToProps, mapDispatchToProps)(Request);

export { RequestConncted as Request };
