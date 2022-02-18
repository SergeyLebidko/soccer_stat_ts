import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import MatchCard from '../../cards/MatchCard/MatchCard';
import Paginator from '../../common/Paginator/Paginator';
import BreadCrumbs from '../../common/BreadCrumbs/BreadCrumbs';
import DatesFilter from '../../common/DatesFilter/DatesFilter';
import {DataType, TMatch} from '../../../types';
import {
  getPaginatedList,
  loadCompetitionCalendar,
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
    // Ищем в загруженных ранее данных информацию о соревновании или команде
    let title: string | undefined;
    if (calendarType === 'competition') {
      title = context.competitionList.find((item) => (item.id + '') === id)?.name;
    }
    if (calendarType === 'team') {
      title = context.teamList.find((item) => (item.id + '') === id)?.name;
    }

    // Если информация не найдена, выводим ошибку
    if (title === undefined) {
      setError('Не найти данные о лиге или команде');
      setPreloader(false);
      return;
    }

    // Если информация найдена - пытаемся загрузить список матчей
    let loadedPromise: Promise<Array<TMatch>> = Promise.resolve([]);
    if (calendarType === 'competition') {
      loadedPromise = loadCompetitionCalendar(id || '');
    }
    if (calendarType === 'team') {
      loadedPromise = loadTeamCalendar(id || '');
    }

    loadedPromise
        .then((matches) => {
          setTitle(title as string);
          setMatches(matches);
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setPreloader(false));
  }, [id, calendarType]);

  if (preloader) return <Preloader/>;

  if (error) return <Error error={error}/>;

  // Применяем пагинацию
  const _matches = getPaginatedList<TMatch>(matches, pageStart);

  // Формируем контент (итоговый список элементов React)
  const content: Array<React.ReactElement> = [];
  _matches.forEach((match) => {
    content.push(<MatchCard key={match.id} match={match}/>);
  });

  return (
    <div className="calendar">
      {calendarType === 'competition' && <BreadCrumbs link={<Link to="/competitions">Лиги</Link>} title={title}/>}
      {calendarType === 'team' && <BreadCrumbs link={<Link to="/teams">Команды</Link>} title={title}/>}
      <h1 className="calendar__title">Матчи</h1>
      <DatesFilter/>
      <ul className="calendar__cards_block">
        {content}
      </ul>
      {matches.length > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={matches.length} setPage={setPageStart}/>}
    </div>
  );
};

export default Calendar;
