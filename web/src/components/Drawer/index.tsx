import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@icons/logo.png';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { systemStateTypes } from '@store/reducers/system.reducer';
import PeopleIcon from '@material-ui/icons/People';

import './Drawer.scss';

interface Props {
    toggle: systemStateTypes['drawer'];
}

const Drawer: React.FC<Props> = ({ toggle }) => {
    const [hide, setHide] = useState(toggle);

    useEffect(() => {
        setTimeout(() => { setHide(toggle) }, 100);
    });

    return (
        <div className={toggle ? 'Drawer Drawer_close' : 'Drawer'}>
            <div className="Drawer__header">
                <img src={logo} alt="Iskor" hidden={hide} />
            </div>
            <ul className="Drawer__list">
                <li>
                    <NavLink
                        to="/customer"
                        className="Drawer__item"
                        activeClassName="Drawer__item_focus"
                    >
                        <PeopleIcon className="Drawer__icon"/>
                        <span className="Drawer__item-text" hidden={hide}>Клиенты</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/supplier"
                        className="Drawer__item"
                        activeClassName="Drawer__item_focus"
                    >
                        <BusinessCenterIcon className="Drawer__icon"/>
                        <span className="Drawer__item-text" hidden={hide}>Поставщики</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Drawer;
