import React from 'react';
import ball from '../../../content/ball.png';
import './Preloader.scss';

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <img className="preloader__logo" src={ball} alt="preloader"/>
    </div>
  );
};

export default Preloader;
