import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <>
      <header className="layout__header">
        <Header/>
      </header>
      <main className="layout__main">
        <Outlet/>
      </main>
    </>
  );
};

export default Layout;
