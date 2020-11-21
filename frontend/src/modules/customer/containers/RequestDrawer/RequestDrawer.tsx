import { requestDrawerActions } from '@customer/store/actions';
import { requestDrawerSelectors } from '@customer/store/selectors';
import TextField from '@material-ui/core/TextField';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import { DrawerForm } from '@system/components/DrawerForm';
import { rootStateTypes } from '@system/store/roots';
import { bem } from '@utils/formatters';
import { validation } from '@utils/validators';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RequestDrawer.scss';

const cn = bem('RequestDrawer');

const mapStateToProps = (state: rootStateTypes) => ({
    open: requestDrawerSelectors.openDrawer(state),
    customer: requestDrawerSelectors.customer(state),
    customerError: requestDrawerSelectors.customerError(state),
    city: requestDrawerSelectors.city(state),
    cityError: requestDrawerSelectors.cityError(state),
    date: requestDrawerSelectors.date(state),
    comment: requestDrawerSelectors.comment(state),
    commentError: requestDrawerSelectors.commentError(state)
});

const mapDispatchToProps = {
    close: requestDrawerActions.close,
    setCustomer: requestDrawerActions.setCustomer,
    setCustomerError: requestDrawerActions.setCustomerError,
    setCity: requestDrawerActions.setCity,
    setCityError: requestDrawerActions.setCityError,
    setDate: requestDrawerActions.setDate,
    setComment: requestDrawerActions.setComment,
    setCommentError: requestDrawerActions.setCommentError,
    setValid: requestDrawerActions.setValid
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestDrawer: React.FC<Props> = (props) => {
    const {
        open,
        close,

        customer,
        setCustomer,
        customerError,
        setCustomerError,

        city,
        setCity,
        cityError,
        setCityError,

        // date,
        setDate,

        comment,
        setComment,
        commentError,
        setCommentError,

        setValid
    } = props;

    const [custHelpText, setCustHelpText] = useState('Обязательное поле');
    const [cityHelpText, setCityHelpText] = useState('Местонахождение заказчика');
    const [commentHelpText, setCommentHelpText] = useState('Прочие сведения о заказчике, пожелания');

    useEffect(() => {
        if (!customerError && !cityError && !commentError) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [
        customerError,
        cityError,
        commentError,
        setValid
    ]);

    const customerHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setCustomer(target.value);

        if (validation.empty(target.value)) {
            setCustomerError(true);
            setCustHelpText('Обязательное поле');
        } else if (validation.length(target.value, 70)) {
            setCustomerError(true);
            setCustHelpText('Превышена длина текста');
        } else {
            setCustomerError(false);
            setCustHelpText('Обязательное поле');
        }
    };

    const cityHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setCity(target.value);

        if (validation.translit(target.value)) {
            setCityError(true);
            setCityHelpText('Только русские буквы');
        } else if (validation.length(target.value, 40)) {
            setCityError(true);
            setCityHelpText('Превышена длина текста');
        } else {
            setCityError(false);
            setCityHelpText('Местонахождение заказчика');
        }
    };

    // const dateHandler = (value: Date | null) => {
    //     if (value !== null) {
    //         setDate(value);
    //     } else {
    //         setDate(new Date());
    //     }
    // };

    const commentHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setComment(target.value);

        if (validation.translit(target.value)) {
            setCommentError(true);
            setCommentHelpText('Только русские буквы');
        } else if (validation.length(target.value, 250)) {
            setCommentError(true);
            setCommentHelpText('Превышена длина текста');
        } else {
            setCommentError(false);
            setCommentHelpText('Прочие сведения о заказчике, пожелания');
        }
    };

    return (
        <DrawerForm
            label="Данные о заказчике"
            width="350"
            toggle={open}
            onClose={close}
        >
            <div className={cn()}>
                <div className={cn('row')}>
                    <TextField
                        label="Название заказчика"
                        onChange={customerHandler}
                        value={customer}
                        error={customerError}
                        size="small"
                        fullWidth
                        multiline
                        helperText={custHelpText}
                    />
                </div>
                <div className={cn('row')}>
                    <TextField
                        label="Город"
                        onChange={cityHandler}
                        value={city}
                        error={cityError}
                        size="small"
                        helperText={cityHelpText}
                    />
                </div>
                {/* <div className={cn('row')}>
                    <KeyboardDatePicker
                        disableToolbar
                        onChange={dateHandler}
                        value={date}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        minDate={new Date()}
                        helperText="Срок поставки"
                    />
                </div> */}
                <div className={cn('row')}>
                    <TextField
                        label="Дополнительная информация"
                        onChange={commentHandler}
                        value={comment}
                        error={commentError}
                        size="small"
                        fullWidth
                        multiline
                        helperText={commentHelpText}
                    />
                </div>
            </div>
        </DrawerForm>
    );
};

const RequestDrawerConnected = connect(mapStateToProps, mapDispatchToProps)(RequestDrawer);

export { RequestDrawerConnected as RequestDrawer };
