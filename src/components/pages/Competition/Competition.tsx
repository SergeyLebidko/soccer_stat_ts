import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import MatchCard from '../../cards/MatchCard/MatchCard';
import {TMatch} from '../../../types';
import {loadCompetitionCalendar} from '../../../utils';
import './Competition.scss';
import {PAGE_SIZE} from '../../../settings';
import Paginator from '../../common/Paginator/Paginator';
import BreadCrumbs from '../../common/BreadCrumbs/BreadCrumbs';

const Competition: React.FC = () => {
  const {id} = useParams();

  const [competitionName, setCompetitionName] = useState<string>('');
  const [matches, setMatches] = useState<Array<TMatch>>([]);

  const [pageStart, setPageStart] = useState<number>(0);

  const [preloader, setPreloader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompetitionCalendar(id || '')
        .then((data) => {
          const [{name}, matches] = data;
          setCompetitionName(name);
          setMatches(matches);
        })
        .catch((err: Error) => setError(err.message))
        .finally(()=>setPreloader(false));
  }, [id]);

  if (preloader) return <Preloader/>;

  if (error) return <Error error={error}/>;

  let _matches = matches;
  const searchedLength = _matches.length;

  // Применяем пагинацию
  _matches = _matches.filter((_, index) => index >= pageStart && index <= (pageStart + PAGE_SIZE - 1));

  return (
    <div className="competitions">
      <BreadCrumbs link={<Link to="/competitions">Лиги</Link>} title={competitionName}/>
      <ul className="competitions__cards_block">
        {_matches.map(((match) => <MatchCard key={match.id} match={match}/>))}
      </ul>
      {searchedLength > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={searchedLength} setPage={setPageStart}/>}
    </div>
  );
};

export default Competition;
