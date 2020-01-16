import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ stock }: { stock?: boolean }) => (
    <header className="header">
        <img src={logo} alt="logo"/>
        <div>
            {stock &&
                <Link 
                    to="/supplier/stock"
                    className="header__item non-decoration"
                >Загрузить прайс-лист</Link>
            }
            <span className="header__item">Выйти</span>
        </div>
    </header>
);

export default Header;
