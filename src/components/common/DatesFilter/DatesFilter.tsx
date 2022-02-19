import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils';
import './DatesFilter.scss';

type DateFilterProps = {
  rangeChangeHandler: (from: string, to: string) => void
}

const DatesFilter: React.FC<DateFilterProps> = ({rangeChangeHandler}) => {
  const [hasMsg, setHasMsg] = useState<boolean>(false);
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const fromBlockId = createRandomString();
  const toBlockId = createRandomString();

  const dateHandler = (): void => {
    if (fromRef.current === null || toRef.current === null) return;
    const from = fromRef.current.value;
    const to = toRef.current.value;
    if ((!!from || !!to) && !(!!from && !!to)) {
      setHasMsg(true);
    } else {
      setHasMsg(false);
    }
    rangeChangeHandler(from, to);
  };

  return (
    <div className="dates_filter">
      <div className="dates_filter__filter_block">
        <label htmlFor={fromBlockId} className="dates_filter__title">с:</label>
        <input id={fromBlockId} ref={fromRef} className="dates_filter__date_field" type="date" onChange={dateHandler}/>
      </div>
      <div className="dates_filter__filter_block">
        <label htmlFor={toBlockId} className="dates_filter__title">по:</label>
        <input id={toBlockId} ref={toRef} className="dates_filter__date_field" type="date" onChange={dateHandler}/>
      </div>
      {hasMsg &&
      <div className="dates_filter__msg_block">
        Для отбора матчей по дате выберите оба значения. Чтобы отменить отбор по дате - удалите оба значения.
      </div>}
    </div>
  );
};

export default DatesFilter;
