import React from 'react';
import {TCompetition} from '../../../types';
import './CompetitionCard.scss';

type CompetitionCardProps = {
  competition: TCompetition
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({competition}) => {
  return <li>{competition.name}</li>;
};

export default CompetitionCard;
