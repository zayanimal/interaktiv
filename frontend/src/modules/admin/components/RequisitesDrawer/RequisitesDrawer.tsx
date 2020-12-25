import React from 'react';
import { Button } from '@material-ui/core';
import { DrawerForm } from '@system/components/DrawerForm';
import { RequisitesFields } from '@admin/components/RequisitesFields';
import { BankRequisitesFields } from '@admin/components/BankRequisitesFields';
import { bem } from '@utils/formatters';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import './RequisitesDrawer.scss';

const grid = bem('FlexGrid');
const cn = bem('RequisitesDrawer');

const RequisitesDrawer: React.FC<CompanyControlProps> = (props) => {
    const { drawer, setDrawer, createBankForm } = props;

    const onClose = () => { setDrawer(false); };

    return (
        <DrawerForm
            label="Добавление реквизитов"
            width="500"
            toggle={drawer}
            onClose={onClose}
        >
            <div className={cn('body')}>
                <div className={grid('col-12')}>
                    <RequisitesFields {...props} />
                    <BankRequisitesFields {...props} />
                    <Button
                        className={cn('button')}
                        variant="outlined"
                        color="primary"
                        onClick={createBankForm}
                    >
                        Добавить банк
                    </Button>
                </div>
            </div>
        </DrawerForm>
    );
};

export { RequisitesDrawer };
