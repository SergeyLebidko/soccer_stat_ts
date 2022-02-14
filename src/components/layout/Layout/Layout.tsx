import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
