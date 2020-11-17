import React, { ReactNode } from 'react';
import { bem } from '@utils/formatters';
import './Modal.scss';

const cn = bem('Modal');

interface Props {
    state: boolean;
    close: () => void;
    title?: string;
    footer?: ReactNode
}

const Modal: React.FC<Props> = (props) => {
    const {
        state,
        close,
        title,
        children,
        footer
    } = props;

    return (state ? (
        <>
            <div className={cn('backdrop')} />
            <div className={cn()}>
                <div className={cn('header')}>
                    {title}
                </div>
                {children}
                <div className={cn('footer')}>
                    {footer}
                </div>
            </div>
        </>
    ) : null);
};

export { Modal };
