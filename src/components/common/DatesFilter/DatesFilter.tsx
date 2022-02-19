import React, {useEffect, useRef, useState} from 'react';
import {createRandomString} from '../../../utils';
import './DatesFilter.scss';

type DateFilterProps = {
  rangeChangeHandler: (from: string, to: string) => void
}

const DatesFilter: React.FC<DateFilterProps> = ({rangeChangeHandler}) => {
  const [error, setError] = useState<string | null>(null);
  const errorTimer: { current: NodeJS.Timeout | undefined } = useRef();

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const fromBlockId = createRandomString();
  const toBlockId = createRandomString();

  const clearTimer = (): void => {
    if (typeof errorTimer.current !== 'undefined') clearTimeout(errorTimer.current);
  };

  // Предотвращаем возможное изменение состояния компонента по таймеру, после того как компонент размонтирован
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const setErrorText = (text: string): void => {
    clearTimer();
    setError(text);
    errorTimer.current = setTimeout(() => setError(null), 6000);
  };

  const applyHandler = (): void => {
    if (fromRef.current === null || toRef.current === null) return;
    const from = fromRef.current.value;
    const to = toRef.current.value;
    if (+Date.parse(from) > +Date.parse(to)) {
      setErrorText('Дата окончания не может быть меньше даты начала');
      return;
    }
    if (!from) {
      setErrorText('Выберите дату начала');
      return;
    }
    if (!to) {
      setErrorText('Выберите дату окончания');
      return;
    }
    rangeChangeHandler(from, to);
  };

  const resetHandler = (): void => {
    if (fromRef.current === null || toRef.current === null) return;
    setError(null);
    fromRef.current.value = '';
    toRef.current.value = '';
    rangeChangeHandler('', '');
  };

  return (
    <div className="dates_filter">
      <div className="dates_filter__filter_block">
        <label htmlFor={fromBlockId} className="dates_filter__title">с:</label>
        <input id={fromBlockId} ref={fromRef} className="dates_filter__date_field" type="date"/>
      </div>
      <div className="dates_filter__filter_block">
        <label htmlFor={toBlockId} className="dates_filter__title">по:</label>
        <input id={toBlockId} ref={toRef} className="dates_filter__date_field" type="date"/>
      </div>
      <button className="dates_filter__button" onClick={resetHandler}>Сброс</button>
      <button className="dates_filter__button" onClick={applyHandler}>Применить</button>
      {error && <div className="dates_filter__error_block">{error}</div>}
    </div>
  );
};

export default DatesFilter;
