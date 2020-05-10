import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { DrawerForm } from '@system/components/DrawerForm';
import { requestDrawerActions } from '@customer/store/actions';
import { requestDrawerSelectors } from '@customer/store/selectors';
import { rootStateTypes } from '@system/store/roots';
import { bem } from '@utils/formatters';
import { validation } from '@utils/validators';
import { KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import './RequestDrawer.scss';

const cn = bem('RequestDrawer');

const mapStateToProps = (state: rootStateTypes) => ({
    open: requestDrawerSelectors.openDrawer(state),
    customer: requestDrawerSelectors.customer(state),
    city: requestDrawerSelectors.city(state),
    date: requestDrawerSelectors.date(state),
    comment: requestDrawerSelectors.comment(state)
});

const mapDispatchToProps = {
    close: requestDrawerActions.close,
    setCustomer: requestDrawerActions.setCustomer,
    setCity: requestDrawerActions.setCity,
    setDate: requestDrawerActions.setDate,
    setComment: requestDrawerActions.setComment,
    setValid: requestDrawerActions.setValid
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestDrawer: React.FC<Props> = (props) => {
    const {
        open,
        close,

        customer,
        setCustomer,

        city,
        setCity,

        date,
        setDate,

        comment,
        setComment,

        setValid
    } = props;

    // TODO: Продумать логику валидации

    const [custError, setCustError] = useState(true);
    const [custHelpText, setCustHelpText] = useState('Обязательное поле');

    const [cityError, setCityError] = useState(false);
    const [cityHelpText, setCityHelpText] = useState('Местонахождение заказчика');

    const [commentError, setCommentError] = useState(false);
    const [commentHelpText, setCommentHelpText] = useState('Прочие сведения о заказчике, пожелания');

    const customerHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setCustomer(target.value);

        if (validation.empty(target.value)) {
            setCustError(true);
            setValid(false);
            setCustHelpText('Обязательное поле');
        } else if (validation.length(target.value, 70)) {
            setCustError(true);
            setValid(false);
            setCustHelpText('Превышена длина текста');
        } else {
            setCustError(false);
            setValid(true);
            setCustHelpText('Обязательное поле');
        }
    };

    const cityHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setCity(target.value);

        if (validation.translit(target.value)) {
            setCityError(true);
            setValid(false);
            setCityHelpText('Только русские буквы');
        } else if (validation.length(target.value, 40)) {
            setCityError(true);
            setValid(false);
            setCityHelpText('Превышена длина текста');
        } else {
            setCityError(false);
            setValid(true);
            setCityHelpText('Местонахождение заказчика');
        }
    };

    const dateHandler = (value: Date | null) => {
        if (value !== null) {
            setDate(value);
        } else {
            setDate(new Date());
        }
    };

    const commentHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setComment(target.value)

        if (validation.translit(target.value)) {
            setCommentError(true);
            setValid(false);
            setCommentHelpText('Только русские буквы');
        } else if (validation.length(target.value, 250)) {
            setCommentError(true);
            setValid(false);
            setCommentHelpText('Превышена длина текста');
        } else {
            setCommentError(false);
            setValid(true);
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
                        error={custError}
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
                <div className={cn('row')}>
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
                </div>
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
