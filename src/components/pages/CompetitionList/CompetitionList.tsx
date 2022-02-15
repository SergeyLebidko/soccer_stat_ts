import React from 'react';
import {TCompetition} from '../../../types';
import './CompetitionList.scss';

type CompetitionListProp = {
  list: Array<TCompetition>
}

const CompetitionList: React.FC<CompetitionListProp> = ({list}) => {
  return (
    <ul>
      {list.map((competition) =>
        <li key={competition.id}>{competition.name}</li>,
      )}
    </ul>
  );
};

export default CompetitionList;
