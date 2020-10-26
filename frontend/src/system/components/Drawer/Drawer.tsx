import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@icons/logo.png';
import Ballot from '@material-ui/icons/Ballot';
import AddBox from '@material-ui/icons/AddBox';
import { bem } from '@utils/formatters';
import './Drawer.scss';

const cn = bem('Drawer');

interface Props {
    toggle: boolean;
}

const Drawer: React.FC<Props> = (props) => {
    const { toggle } = props;
    const [hide, setHide] = useState(toggle);

    useEffect(() => {
        if (toggle) {
            setHide(toggle);
        } else {
            setTimeout(() => { setHide(toggle); }, 200);
        }
    }, [toggle]);

    return (
        <aside className={toggle ? cn('', 'close') : cn()}>
            <div className={cn('header')}>
                <img src={logo} alt="Iskor" hidden={hide} />
            </div>
            <ul className={cn('list')}>
                <li>
                    <NavLink
                        to="/projects"
                        className={cn('item')}
                        activeClassName={cn('item_focus')}
                    >
                        <Ballot className={cn('icon')} />
                        <span className={cn('item-text')} hidden={hide}>Мои проекты</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/new-project"
                        className={cn('item')}
                        activeClassName={cn('item_focus')}
                    >
                        <AddBox className={cn('icon')} />
                        <span className={cn('item-text')} hidden={hide}>Новый проект</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export { Drawer };
