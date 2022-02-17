import React, {useState} from 'react';
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

  const changeSearchHandler = (event: React.ChangeEvent): void => {
    setSearch((event.target as HTMLInputElement).value);
    setPageStart(0);
  };

  let _list = list;

  // Отсекаем элементы, не подходящие под критерии поиска
  if (search.length > 0) {
    const _search = search.toLowerCase();
    _list = list.filter(({name: cName, area: {name: aName}}) => {
      return cName.toLowerCase().includes(_search) || aName.toLowerCase().includes(_search);
    });
  }
  const searchedLength = _list.length;

  // Применяем пагинацию
  _list = _list.filter((_, index) => index >= pageStart && index <= (pageStart + PAGE_SIZE - 1));

  return (
    <div className="competition_list">
      <SearchField search={search} changeSearchHandler={changeSearchHandler}/>
      <ul className="competition_list__cards_block">
        {_list.map((item) => <CompetitionCard key={item.id} competition={item}/>)}
      </ul>
      {searchedLength > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={searchedLength} setPage={setPageStart}/>}
    </div>
  );
};

export default CompetitionList;
