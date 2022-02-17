import React from 'react';
import {TMatch} from '../../../types';
import './MatchCard.scss';

type MatchCardProps = {
  match: TMatch
}

const MatchCard: React.FC<MatchCardProps> = ({match}) => {
  return <div>{match.id}</div>;
};

export default MatchCard;
