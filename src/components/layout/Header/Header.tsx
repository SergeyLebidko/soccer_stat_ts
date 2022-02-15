import React from 'react';
import './Header.scss';
import {Link, NavLink} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
      <Link to="/">Главная</Link>
      <NavLink to="competitions" style={({isActive}) => isActive ? {color: 'red'} : {}}>
        Лиги
      </NavLink>
      <NavLink to="teams" style={({isActive}) => isActive ? {color: 'red'} : {}}>
        Команды
      </NavLink>
    </div>
  );
};

export default Header;
