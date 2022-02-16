import React, {useCallback, useState} from 'react';
import {TCompetition} from '../../../types';
import CompetitionCard from '../../cards/CompetitionCard/CompetitionCard';
import SearchField from '../../common/SearchField/SearchField';
import Paginator from '../../common/Paginator/Paginator';
import {PAGE_SIZE} from '../../../settings';
import './CompetitionList.scss';

type CompetitionListProp = {
  list: Array<TCompetition>
}

const CompetitionList: React.FC<CompetitionListProp> = ({list}) => {
  const [pageStart, setPageStart] = useState<number>(0);
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
    setPageStart(0);
  };

  const listForShow = createListForShow();

  return (
    <div className="competition_list">
      <SearchField search={search} changeSearchHandler={changeSearchHandler}/>
      <ul className="competition_list__cards_block">
        {listForShow
            .filter((_, index) => index >= pageStart && index <= (pageStart + PAGE_SIZE - 1))
            .map((competition) =>
              <CompetitionCard key={competition.id} competition={competition}/>,
            )
        }
      </ul>
      {listForShow.length > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={listForShow.length} setPage={setPageStart}/>}
    </div>
  );
};

export default CompetitionList;
