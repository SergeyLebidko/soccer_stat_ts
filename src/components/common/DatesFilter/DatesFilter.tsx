import React from 'react';
import {createRandomString} from '../../../utils';
import './DatesFilter.scss';

const DatesFilter: React.FC = () => {
  const fromBlockId = createRandomString();
  const toBlockId = createRandomString();

  const fromChangeHandler = (event: React.ChangeEvent): void => {
    // TODO Тестовый вывод
    console.log((event.target as HTMLInputElement).value, (event.target as HTMLInputElement).value.length);
  };

  return (
    <div className="dates_filter">
      <div className="dates_filter__filter_block">
        <label htmlFor={fromBlockId} className="dates_filter__title">с:</label>
        <input id={fromBlockId} className="dates_filter__date_field" type="date" onChange={fromChangeHandler}/>
      </div>
      <div className="dates_filter__filter_block">
        <label htmlFor={toBlockId} className="dates_filter__title">по:</label>
        <input id={toBlockId} className="dates_filter__date_field" type="date"/>
      </div>
    </div>
  );
};

export default DatesFilter;
