import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import ball from '../../../content/ball.png';
import './Header.scss';
import classNames from 'classnames';

const Header: React.FC = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={ball} alt="Главная страница"/>
      </Link>
      <NavLink
        to="competitions"
        className={({isActive}) => classNames('header__link', {'header__link_active': isActive})}>
        Лиги
      </NavLink>
      <NavLink
        to="teams"
        className={({isActive}) => classNames('header__link', {'header__link_active': isActive})}>
        Команды
      </NavLink>
    </div>
  );
};

export default Header;
