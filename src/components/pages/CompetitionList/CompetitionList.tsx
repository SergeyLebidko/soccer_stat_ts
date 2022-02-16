import React, {useCallback, useState} from 'react';
import {TCompetition} from '../../../types';
import CompetitionCard from '../../cards/CompetitionCard/CompetitionCard';
import SearchField from '../../common/SearchField/SearchField';
import './CompetitionList.scss';

type CompetitionListProp = {
  list: Array<TCompetition>
}

const CompetitionList: React.FC<CompetitionListProp> = ({list}) => {
  const [search, setSearch] = useState<string>('');

  const createListForShow = useCallback(() => {
    if (search.length === 0) return list;
    const _search = search.toLowerCase();
    return list.filter(({name: cName, area: {name: aName}}) => {
      return cName.toLowerCase().includes(_search) || aName.toLowerCase().includes(_search);
    });
  }, [search, list]);

  const changeSearchHandler = (event: React.ChangeEvent): void => {
    setSearch((event.target as HTMLInputElement).value);
  };

  const listForShow = createListForShow();

  return (
    <div className="competition_list">
      <SearchField search={search} changeSearchHandler={changeSearchHandler}/>
      <ul className="competition_list__cards_block">
        {listForShow.map((competition) =>
          <CompetitionCard key={competition.id} competition={competition}/>,
        )}
      </ul>
    </div>
  );
};

export default CompetitionList;
