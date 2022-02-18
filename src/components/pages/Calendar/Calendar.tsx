import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import MatchCard from '../../cards/MatchCard/MatchCard';
import Paginator from '../../common/Paginator/Paginator';
import BreadCrumbs from '../../common/BreadCrumbs/BreadCrumbs';
import DatesFilter from '../../common/DatesFilter/DatesFilter';
import {CalendarType, TMatch} from '../../../types';
import {getPaginatedList, loadCompetitionCalendar} from '../../../utils';
import {PAGE_SIZE} from '../../../settings';
import './Calendar.scss';

type CalendarProps = {
  calendarType: CalendarType
}

const Calendar: React.FC<CalendarProps> = ({calendarType}) => {
  const {id} = useParams();

  const [title, setTitle] = useState<string>('');
  const [matches, setMatches] = useState<Array<TMatch>>([]);

  const [pageStart, setPageStart] = useState<number>(0);

  // const [from, setFrom] = useState<string>('');
  // const [to, setTo] = useState<string>('');

  const [preloader, setPreloader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompetitionCalendar(id || '')
        .then((data) => {
          const [{name}, matches] = data;
          setTitle(name);
          setMatches(matches);
        })
        .catch((err: Error) => setError(err.message))
        .finally(()=>setPreloader(false));
  }, [id]);

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
      <BreadCrumbs link={<Link to="/competitions">Лиги</Link>} title={title}/>
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