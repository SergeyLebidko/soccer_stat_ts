import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import MatchCard from '../../cards/MatchCard/MatchCard';
import Paginator from '../../common/Paginator/Paginator';
import BreadCrumbs from '../../common/BreadCrumbs/BreadCrumbs';
import DatesFilter from '../../common/DatesFilter/DatesFilter';
import {DataType, DateRange, TCompetition, TMatch, TTeam} from '../../../types';
import {loadElement, loadMatches} from '../../../utils/fetch_utils';
import {PAGE_SIZE} from '../../../settings';
import {AppContext} from '../../../context';
import {getPaginatedList} from '../../../utils/common_utils';
import './Calendar.scss';

type CalendarProps = {
  calendarType: DataType
}

const Calendar: React.FC<CalendarProps> = ({calendarType}) => {
  const context = useContext(AppContext);
  const {id} = useParams();

  const [preloader, setPreloader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>('');

  const [matches, setMatches] = useState<Array<TMatch>>([]);
  const [pageStart, setPageStart] = useState<number>(0);

  const [dateRange, setDateRange] = useState<DateRange>(['', '']);

  const hasFirsRender = useRef<boolean>(true);

  const reset = (fullReset: boolean): void => {
    setPreloader(true);
    setError(null);
    setMatches([]);
    setPageStart(0);
    if (fullReset) {
      setTitle('');
      setDateRange(['', '']);
    }
  };

  const reload = (withTitle: boolean): void => {
    const promiseList: Array<Promise<TCompetition | TTeam | TMatch[]>> = [];
    promiseList.push(loadMatches(+(id as string), calendarType, dateRange));

    // Если нужно перезагрузить данные заголовка, то сперва пытаемся найти их в ранее загруженных данных
    if (withTitle) {
      let title: TTeam | TCompetition | undefined;
      if (calendarType === 'competition') {
        title = context.competitionList.find((item) => item.id === +(id as string));
      }
      if (calendarType === 'team') {
        title = context.teamList.find((item) => item.id === +(id as string));
      }
      promiseList.push(title === undefined ? loadElement(+(id as string), calendarType) : Promise.resolve(title));
    }

    Promise.all(promiseList)
        .then(([matches, title]) => {
          setMatches(matches as TMatch[]);
          if (withTitle) {
            setTitle((title as TCompetition | TTeam).name);
          }
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setPreloader(false));
  };

  // При изменении входных параметров компонента - полностью сбрасываем состояние и перезагружаем все данные
  useEffect(() => {
    // Небольшая оптимизация: при первом рендере не сбрасываем состояние компонента
    if (hasFirsRender.current) {
      hasFirsRender.current = false;
    } else {
      reset(true);
    }
    reload(true);
  }, [id, calendarType, context]);

  // При изменении диапазона дат - сбрасываем состояние (за исключением дат и заголовка) и перезагружаем список матчей
  useEffect(() => {
    reset(false);
    reload(false);
  }, [dateRange]);

  const rangeChangeHandler = (nextDateRange: DateRange): void => {
    const [curFrom, curTo] = dateRange;
    const [nextFrom, nextTo] = nextDateRange;
    if (curFrom === nextFrom && curTo === nextTo) return;
    setDateRange(nextDateRange);
  };

  if (preloader) return <Preloader/>;

  if (error) return <Error error={error}/>;

  // Применяем пагинацию
  const _matches = getPaginatedList<TMatch>(matches, pageStart);

  return (
    <div className="calendar">
      {calendarType === 'competition' && <BreadCrumbs link={<Link to="/competitions">Лиги</Link>} title={title}/>}
      {calendarType === 'team' && <BreadCrumbs link={<Link to="/teams">Команды</Link>} title={title}/>}
      <h1 className="calendar__title">Матчи</h1>
      <DatesFilter rangeChangeHandler={rangeChangeHandler} startFrom={dateRange[0]} startTo={dateRange[1]}/>
      <ul className="calendar__cards_block">
        {_matches.map((match) => <MatchCard key={match.id} match={match}/>)}
      </ul>
      {matches.length > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={matches.length} setPage={setPageStart}/>}
    </div>
  );
};

export default Calendar;
