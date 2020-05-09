import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { Transition } from 'react-transition-group';
import { bem } from '@utils/formatters';
import './DrawerForm.scss';

const cn = bem('DrawerForm');

const transitionStyles = {
    entering: { width: 450 },
    entered:  { width: 450 },
    exiting:  { width: 0 },
    exited:  { width: 0 },
    unmounted: { width: 0 }
};

interface Props {
    label?: string;
    toggle: boolean;
    onClose: () => void;
};

const DrawerForm: React.SFC<Props> = (props) => {
    const { label, toggle, onClose, children } = props;
    const [visible, setVisible] = useState(false);

    const drawer = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!drawer.current?.contains(target)) {
                onClose();
            }
        };

        document.addEventListener("click", handleClick, false);

        return () => {
          document.removeEventListener("click", handleClick, false);
        };
    });

    return (
        <Transition
            in={toggle}
            timeout={150}
            onEntered={() => { setVisible(true) }}
            onExiting={() => { setVisible(false) }}
        >
            {state => (
                <div
                    ref={drawer}
                    style={{...transitionStyles[state]}}
                    className={cn()}
                >
                    {visible &&
                        <>
                            <div
                                className={cn('header')}
                            >
                                {label}
                                <IconButton size="small" onClick={onClose}>
                                    <Close />
                                </IconButton>
                            </div>
                            {children}
                        </>
                    }
                </div>
            )}
        </Transition>
    );
};

DrawerForm.defaultProps = {
    onClose: () => {}
};

export { DrawerForm };
