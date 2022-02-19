import React, {useContext, useEffect, useState} from 'react';
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

  const [title, setTitle] = useState<string>('');
  const [matches, setMatches] = useState<Array<TMatch>>([]);

  const [pageStart, setPageStart] = useState<number>(0);

  // const [from, setFrom] = useState<string>('');
  // const [to, setTo] = useState<string>('');

  const [preloader, setPreloader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Чтобы уменьшить количество запросов к api, ищем данные о команде или лиге в загруженных при старте данных
    let title: TTeam | TCompetition | undefined;
    if (calendarType === 'competition') {
      title = context.competitionList.find((item) => (item.id + '') === id);
    }
    if (calendarType === 'team') {
      title = context.teamList.find((item) => (item.id + '') === id);
    }
    let titlePromise: Promise<TTeam | TCompetition | undefined> = Promise.resolve(title);

    // Если информация не найдена в кэшированных данных - пробуем загрузить ее с сервера
    if (title === undefined) {
      if (calendarType === 'competition') {
        titlePromise = loadCompetition(id + '');
      }
      if (calendarType === 'team') {
        titlePromise = loadTeam(id + '');
      }
    }

    // Пытаемся загрузить список матчей лиги или команды
    let matchesPromise: Promise<Array<TMatch>> = Promise.resolve([]);
    if (calendarType === 'competition') {
      matchesPromise = loadCompetitionCalendar(id || '');
    }
    if (calendarType === 'team') {
      matchesPromise = loadTeamCalendar(id || '');
    }

    Promise.all([matchesPromise, titlePromise])
        .then(([matches, title]) => {
          setTitle((title as TCompetition | TTeam).name);
          setMatches(matches);
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setPreloader(false));
  }, [id, calendarType, context]);

  if (preloader) return <Preloader/>;

  if (error) return <Error error={error}/>;

  // Применяем пагинацию
  const _matches = getPaginatedList<TMatch>(matches, pageStart);

  return (
    <div className="calendar">
      {calendarType === 'competition' && <BreadCrumbs link={<Link to="/competitions">Лиги</Link>} title={title}/>}
      {calendarType === 'team' && <BreadCrumbs link={<Link to="/teams">Команды</Link>} title={title}/>}
      <h1 className="calendar__title">Матчи</h1>
      <DatesFilter/>
      <ul className="calendar__cards_block">
        {_matches.map((match) => <MatchCard key={match.id} match={match}/>)}
      </ul>
      {matches.length > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={matches.length} setPage={setPageStart}/>}
    </div>
  );
};

export default Calendar;
