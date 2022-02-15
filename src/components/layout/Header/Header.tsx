import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import ball from '../../../content/ball.png';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <div>
      <Link to="/"><img src={ball}/></Link>
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
