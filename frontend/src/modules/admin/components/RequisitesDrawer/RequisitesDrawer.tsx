import React from 'react';
import { Button } from '@material-ui/core';
import { DrawerForm } from '@system/components/DrawerForm';
import { RequisitesFields } from '@admin/components/RequisitesFields';
import { BankRequisitesFields } from '@admin/components/BankRequisitesFields';
import { bem } from '@utils/formatters';
import './RequisitesDrawer.scss';

const grid = bem('FlexGrid');
const cn = bem('RequisitesDrawer');

interface Props {

}

const RequisitesDrawer: React.FC<Props> = (props) => {
    // const {

    // } = props;

    return (
        <DrawerForm
            label="Добавление реквизитов"
            width="500"
            toggle={true}
            onClose={() => {}}
        >
            <div className={cn('body')}>
                <div className={grid('col-12')}>
                    <RequisitesFields />
                    <BankRequisitesFields />
                    <Button
                        className={cn('button')}
                        variant="outlined"
                        color="primary"
                    >
                        Добавить банк
                    </Button>
                </div>
            </div>
        </DrawerForm>
    );
};

export { RequisitesDrawer };
