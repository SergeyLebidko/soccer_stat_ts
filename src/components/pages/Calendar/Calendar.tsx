import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import MatchCard from '../../cards/MatchCard/MatchCard';
import Paginator from '../../common/Paginator/Paginator';
import BreadCrumbs from '../../common/BreadCrumbs/BreadCrumbs';
import DatesFilter from '../../common/DatesFilter/DatesFilter';
import {DataType, TCompetition, TMatch, TTeam} from '../../../types';
import {
  getPaginatedList, loadCompetition,
  loadCompetitionCalendar, loadTeam,
  loadTeamCalendar,
} from '../../../utils';
import {PAGE_SIZE} from '../../../settings';
import {AppContext} from '../../../context';
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

  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);

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

  // Функция возвращает промис с данными о лиге или команде, матчи которых отображает компонент
  const reloadTitle = (): Promise<TTeam | TCompetition> => {
    // Чтобы уменьшить количество запросов к api, ищем данные о команде или лиге в загруженных при старте данных
    let title: TTeam | TCompetition | undefined;
    if (calendarType === 'competition') {
      title = context.competitionList.find((item) => (item.id + '') === id);
    }
    if (calendarType === 'team') {
      title = context.teamList.find((item) => (item.id + '') === id);
    }

    // Если информация не найдена в кэшированных данных - пробуем загрузить ее с сервера
    if (title === undefined) {
      if (calendarType === 'competition') {
        return loadCompetition(id + '');
      }
      if (calendarType === 'team') {
        return loadTeam(id + '');
      }
    }

    return Promise.resolve(title as TCompetition | TTeam);
  };

  // Функция возвращает промис с данными о матчах лиги или команды
  const reloadMatches = (): Promise<Array<TMatch>> => {
    let matchesPromise: Promise<Array<TMatch>> = Promise.resolve([]);
    const [from, to] = dateRange;
    if (calendarType === 'competition') {
      matchesPromise = loadCompetitionCalendar(id || '', from, to);
    }
    if (calendarType === 'team') {
      matchesPromise = loadTeamCalendar(id || '', from, to);
    }
    return matchesPromise;
  };

  const reload = (withTitle: boolean): void => {
    const promiseList: Array<Promise<any>> = [];
    promiseList.push(reloadMatches());
    if (withTitle) {
      promiseList.push(reloadTitle());
    }
    Promise.all(promiseList)
        .then(([matches, title]) => {
          setMatches(matches);
          if (withTitle) {
            setTitle((title as TCompetition | TTeam).name);
          }
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setPreloader(false));
  };

  // При изменении входных параметров компонента - полность сбрасываем состояние и перезагружаем все данные
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

  const rangeChangeHandler = (from: string, to: string): void => {
    const [curFrom, curTo] = dateRange;
    if (curFrom === from && curTo === to) return;
    setDateRange([from, to]);
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
