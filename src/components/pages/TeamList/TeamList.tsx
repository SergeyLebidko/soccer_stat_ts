import React from 'react';
import {TTeam} from '../../../types';
import './TeamList.scss';
import TeamCard from '../../cards/TeamCard/TeamCard';

type TeamListProp = {
  list: Array<TTeam>
}

const TeamList: React.FC<TeamListProp> = ({list}) => {
  return (
    <ul>
      {list.map((team) => <TeamCard key={team.id} team={team}/>)}
    </ul>
  );
};

export default TeamList;
