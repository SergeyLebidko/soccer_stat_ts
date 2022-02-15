import React from 'react';
import {TTeam} from '../../../types';
import './TeamList.scss';

type TeamListProp = {
  list: Array<TTeam>
}

const TeamList: React.FC<TeamListProp> = ({list}) => {
  return (
    <ul>
      {list.map((team) => <li key={team.id}>{team.name}</li>)}
    </ul>
  );
};

export default TeamList;
