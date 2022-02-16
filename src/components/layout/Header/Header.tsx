import React from 'react';
import {NavLink} from 'react-router-dom';
import ball from '../../../content/ball.png';
import './Header.scss';
import classNames from 'classnames';

const Header: React.FC = () => {
  const classSelector = (arg: { isActive: boolean }): string => {
    return classNames('header__link', {'header__link_active': arg.isActive});
  };

  return (
    <div className="header">
      <img className="header__logo" src={ball} alt="Главная страница"/>
      <NavLink to="competitions" className={classSelector}>Лиги</NavLink>
      <NavLink to="teams" className={classSelector}>Команды</NavLink>
    </div>
  );
};

export default Header;
