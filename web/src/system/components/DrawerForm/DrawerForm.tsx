import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import { bem } from '@utils/formatters';
import './DrawerForm.scss';

const cn = bem('DrawerForm');

const transitionStyles = {
    entering: { width: 500 },
    entered:  { width: 500 },
    exiting:  { width: 0 },
    exited:  { width: 0 },
    unmounted: { width: 0 }
};


interface Props {
    toggle: boolean;
};

const DrawerForm: React.SFC<Props> = (props) => {
    const { toggle, children } = props;
    const [visible, setVisible] = useState(false);

    return (
        <Transition
            in={toggle}
            timeout={150}
            onEntered={() => { setVisible(true) }}
            onExiting={() => { setVisible(false) }}
        >
            {state => (
                <div
                    style={{...transitionStyles[state]}}
                    className={cn()}
                >
                    {visible ? children : null}
                </div>
            )}
        </Transition>
    );
};

export { DrawerForm };
