import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@icons/logo.png';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PeopleIcon from '@material-ui/icons/People';

import './Drawer.scss';

interface DrawerProps {
    toggle: boolean;
}

const Drawer: React.SFC<DrawerProps> = ({ toggle }) => (
    <div className="Drawer">
        <div className="Drawer__header">
            <img src={logo} alt="Iskor"/>
        </div>
            { toggle ? 'hello' : 'bye' }
            <ul className="Drawer__list">
                <li>
                    <NavLink
                        to="/customer"
                        className="Drawer__item"
                        activeClassName="Drawer__item_focus"
                    >
                        <PeopleIcon className="Drawer__icon"/>
                        <span className="Drawer__item-text">
                            Клиенты
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/supplier"
                        className="Drawer__item"
                        activeClassName="Drawer__item_focus"
                    >
                        <BusinessCenterIcon className="Drawer__icon"/>
                        <span className="Drawer__item-text">
                            Поставщики
                        </span>
                    </NavLink>
                </li>
            </ul>
    </div>
);

export default Drawer;
