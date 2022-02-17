import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Competition.scss';

const Competition: React.FC = () => {
  const {id} = useParams();

  useEffect(() => {

  }, [id]);

  return (
    <div>
      Список игр лиги
    </div>
  );
};

export default Competition;
