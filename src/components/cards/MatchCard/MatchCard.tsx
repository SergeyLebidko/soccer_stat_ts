import React from 'react';
import {TMatch} from '../../../types';
import './MatchCard.scss';

type MatchCardProps = {
  match: TMatch
}

const MatchCard: React.FC<MatchCardProps> = ({match}) => {
  return (
    <li className="match_card">
      <span>{match.utcDate}</span>
      <span>{match.status}</span>
      <span>{match.homeTeam.name}</span>
      <span>{match.awayTeam.name}</span>
      <span>{match.score.fullTime.homeTeam}</span>
      <span>{match.score.fullTime.awayTeam}</span>
      <span>{match.score.extraTime.homeTeam}</span>
      <span>{match.score.penalties.homeTeam}</span>
      <span>{match.score.penalties.awayTeam}</span>
    </li>
  );
};

export default MatchCard;
