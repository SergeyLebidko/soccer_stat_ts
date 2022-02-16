import React from 'react';
import {TCompetition} from '../../../types';
import CompetitionCard from '../../cards/CompetitionCard/CompetitionCard';
import SearchField from '../../common/SearchField/SearchField';
import './CompetitionList.scss';

type CompetitionListProp = {
  list: Array<TCompetition>
}

const CompetitionList: React.FC<CompetitionListProp> = ({list}) => {
  return (
    <div className="competition_list">
      <SearchField/>
      <ul className="competition_list__cards_block">
        {list.map((competition) =>
          <CompetitionCard key={competition.id} competition={competition}/>,
        )}
      </ul>
    </div>
  );
};

export default CompetitionList;
