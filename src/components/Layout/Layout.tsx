import React from 'react';
import {Outlet} from 'react-router-dom';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        Заголовок страницы
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
