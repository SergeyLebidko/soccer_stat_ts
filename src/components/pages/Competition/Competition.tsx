import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Error from '../../common/Error/Error';
import {TMatch} from '../../../types';
import {loadCompetitionCalendar} from '../../../utils';
import './Competition.scss';
import MatchCard from '../../cards/MatchCard/MatchCard';

const Competition: React.FC = () => {
  const {id} = useParams();

  const [competitionName, setCompetitionName] = useState<string>('');
  const [matches, setMatches] = useState<Array<TMatch>>([]);

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

  return (
    <div>
      {competitionName}
      {matches.map(((match) => <MatchCard key={match.id} match={match}/>))}
    </div>
  );
};

export default Competition;
