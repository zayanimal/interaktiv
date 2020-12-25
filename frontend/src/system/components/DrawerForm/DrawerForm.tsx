import React, { useEffect, useRef } from 'react';
import { cond } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { Transition } from 'react-transition-group';
import { bem } from '@utils/formatters';
import './DrawerForm.scss';

const cn = bem('DrawerForm');

const transitionStyles = {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(100%)' },
    exited: { transform: 'translateX(100%)' },
    unmounted: { transform: 'translateX(100%)' },
};

interface Props {
    label?: string;
    width?: string;
    toggle: boolean;
    onClose: () => void;
}

const DrawerForm: React.FC<Props> = (props) => {
    const {
        label,
        width = '450',
        toggle,
        onClose = () => {},
        children,
    } = props;

    const drawer = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => cond([
            [(t: HTMLElement) => t.querySelector('button')?.id !== 'close', () => {}],
            [(t: HTMLElement) => t.closest('.MuiPopover-root') !== null, onClose],
            [(t: HTMLElement) => !!t.getAttribute('aria-hidden'), () => onClose],
        ])(e.target as HTMLElement);

        document.addEventListener('click', handleClick, false);

        return () => {
            document.removeEventListener('click', handleClick, false);
        };
    });

    return (
        <Transition
            in={toggle}
            timeout={200}
        >
            {(state) => (
                <div
                    ref={drawer}
                    style={{ ...transitionStyles[state], width: `${width}px` }}
                    className={cn()}
                >
                    <div
                        className={cn('header')}
                    >
                        {label}
                        <IconButton id="close" size="small" onClick={onClose}>
                            <Close />
                        </IconButton>
                    </div>
                    {children}
                </div>
            )}
        </Transition>
    );
};

export { DrawerForm };
