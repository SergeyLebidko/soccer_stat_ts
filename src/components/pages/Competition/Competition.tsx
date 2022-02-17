import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import MatchCard from '../../cards/MatchCard/MatchCard';
import Paginator from '../../common/Paginator/Paginator';
import BreadCrumbs from '../../common/BreadCrumbs/BreadCrumbs';
import DatesFilter from '../../common/DatesFilter/DatesFilter';
import {TMatch} from '../../../types';
import {loadCompetitionCalendar} from '../../../utils';
import {PAGE_SIZE} from '../../../settings';
import './Competition.scss';

const Competition: React.FC = () => {
  const {id} = useParams();

  const [competitionName, setCompetitionName] = useState<string>('');
  const [matches, setMatches] = useState<Array<TMatch>>([]);

  const [pageStart, setPageStart] = useState<number>(0);

  const [from] = useState<number | null>(null);
  const [to] = useState<number | null>(null);

  const [preloader, setPreloader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreloader(true);
    setError(null);

    // TODO Вставить применение фильтра по дате
    loadCompetitionCalendar(id || '')
        .then((data) => {
          const [{name}, matches] = data;
          setCompetitionName(name);
          setMatches(matches);
        })
        .catch((err: Error) => setError(err.message))
        .finally(()=>setPreloader(false));
  }, [id, from, to]);

  if (preloader) return <Preloader/>;

  if (error) return <Error error={error}/>;

  // Применяем пагинацию
  const _matches = matches.filter((_, index) => index >= pageStart && index <= (pageStart + PAGE_SIZE - 1));

  return (
    <div className="competitions">
      <BreadCrumbs link={<Link to="/competitions">Лиги</Link>} title={competitionName}/>
      <DatesFilter/>
      <ul className="competitions__cards_block">
        {_matches.map(((match) => <MatchCard key={match.id} match={match}/>))}
      </ul>
      {matches.length > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={matches.length} setPage={setPageStart}/>}
    </div>
  );
};

export default Competition;
