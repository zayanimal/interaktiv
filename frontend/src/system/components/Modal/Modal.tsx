import React, { ReactNode } from 'react';
import { Button } from '@material-ui/core';
import { bem } from '@utils/formatters';
import './Modal.scss';

const cn = bem('Modal');

interface Action {
    actionName?: string;
    actionCall?: () => void;
}

interface Props {
    open: boolean;
    close?: () => void;
    action: Action;
    actionName?: string;
    title?: string;
    footer?: ReactNode
}

const Modal: React.FC<Props> = (props) => {
    const {
        open,
        close = () => {},
        action: {
            actionName = 'Сохранить',
            actionCall = () => {}
        },
        title = '',
        children,
        footer
    } = props;

    return (open ? (
        <>
            <div className={cn('backdrop')} />
            <div className={cn()}>
                <div className={cn('header')}>
                    {title}
                </div>
                {children}
                <div className={cn('footer')}>
                    {footer || (
                        <>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={close}
                            >
                                Отменить
                            </Button>
                            <Button
                                disabled
                                variant="text"
                                color="primary"
                                onClick={actionCall}
                            >
                                {actionName}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    ) : null);
};

export { Modal };
