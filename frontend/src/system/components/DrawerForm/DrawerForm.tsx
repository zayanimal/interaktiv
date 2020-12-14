import React, { useEffect, useRef } from 'react';
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
        label, width, toggle, onClose, children,
    } = props;

    const drawer = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            /** Обработка закрытия дровера в случаях когда открыт Popover материал */
            const closeHandler = (htarget: HTMLElement) => {
                const popover = htarget.closest('.MuiPopover-root');

                if (popover !== null || htarget.getAttribute('aria-hidden')) {
                    return false;
                }

                return !drawer.current?.contains(htarget);
            };

            if (closeHandler(target)) {
                onClose();
            }
        };

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
                        <IconButton size="small" onClick={onClose}>
                            <Close />
                        </IconButton>
                    </div>
                    {children}
                </div>
            )}
        </Transition>
    );
};

DrawerForm.defaultProps = {
    width: '450',
    onClose: () => {},
};

export { DrawerForm };
