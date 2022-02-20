import React from 'react';
import {TMatch} from '../../../types';
import {STATUS_LIST} from '../../../settings';
import './MatchCard.scss';
import ScoreElement from '../../common/ScoreElement/ScoreElement';
import {Link} from 'react-router-dom';
import {getDateString} from '../../../utils/common_utils';

type MatchCardProps = {
  match: TMatch
}

const MatchCard: React.FC<MatchCardProps> = ({match}) => {
  const {utcDate, status, homeTeam, awayTeam, score: {fullTime, extraTime, penalties}} = match;

  return (
    <li className="match_card">
      <span className="match_card__date">{getDateString(utcDate)}</span>
      <span className="match_card__status">{STATUS_LIST[status]}</span>
      <div className="match_card__teams">
        <Link to={`/teams/${homeTeam.id}`}>{homeTeam.name}</Link>
        <Link to={`/teams/${awayTeam.id}`}>{awayTeam.name}</Link>
      </div>
      <div className="match_card__score">
        <ScoreElement homeTeamScore={fullTime.homeTeam} awayTeamScore={fullTime.awayTeam}/>
        <ScoreElement homeTeamScore={extraTime.homeTeam} awayTeamScore={extraTime.awayTeam} brackets/>
        <ScoreElement homeTeamScore={penalties.homeTeam} awayTeamScore={penalties.awayTeam} brackets/>
      </div>
    </li>
  );
};

export default MatchCard;
