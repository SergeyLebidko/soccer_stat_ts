import React from 'react';
import {TTeam} from '../../../types';
import './TeamCard.scss';

type TeamCardProps = {
  team: TTeam
}

const TeamCard: React.FC<TeamCardProps> = ({team}) => {
  return <li>{team.name}</li>;
};

export default TeamCard;
