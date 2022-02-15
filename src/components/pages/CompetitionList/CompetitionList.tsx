import React from 'react';
import {TCompetition} from '../../../types';
import './CompetitionList.scss';
import CompetitionCard from '../../cards/CompetitionCard/CompetitionCard';

type CompetitionListProp = {
  list: Array<TCompetition>
}

const CompetitionList: React.FC<CompetitionListProp> = ({list}) => {
  return (
    <ul>
      {list.map((competition) =>
        <CompetitionCard key={competition.id} competition={competition}/>,
      )}
    </ul>
  );
};

export default CompetitionList;
