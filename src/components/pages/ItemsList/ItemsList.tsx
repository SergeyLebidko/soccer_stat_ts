import React, {useEffect, useState} from 'react';
import {TCompetition, TTeam} from '../../../types';
import CompetitionCard from '../../cards/CompetitionCard/CompetitionCard';
import SearchField from '../../common/SearchField/SearchField';
import Paginator from '../../common/Paginator/Paginator';
import TeamCard from '../../cards/TeamCard/TeamCard';
import {PAGE_SIZE} from '../../../settings';
import {isTCompetition, isTTeam} from '../../../utils';
import './ItemsList.scss';

type CompetitionListProp = {
  list: Array<TCompetition | TTeam>
}

const ItemsList: React.FC<CompetitionListProp> = ({list}) => {
  const [pageStart, setPageStart] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  // При изменении исходного списка - сбрасываем параметры пагинации
  useEffect(()=>{
    setPageStart(0);
  }, [list]);

  const changeSearchHandler = (event: React.ChangeEvent): void => {
    setSearch((event.target as HTMLInputElement).value);
    setPageStart(0);
  };

  let _list = list;

  // Отсекаем элементы, не подходящие под критерии поиска
  if (search.length > 0) {
    const _search = search.toLowerCase();
    _list = list.filter((item: TCompetition | TTeam): boolean => {
      if (isTCompetition(item)) {
        const {name: cName, area: {name: aName}} = item;
        return cName.toLowerCase().includes(_search) || aName.toLowerCase().includes(_search);
      } else {
        return item.name.toLowerCase().includes(_search);
      }
    });
  }
  const searchedLength = _list.length;

  // Применяем пагинацию
  _list = _list.filter((_, index) => index >= pageStart && index <= (pageStart + PAGE_SIZE - 1));

  // Формируем контент (итоговый список элементов React)
  const content: Array<React.ReactElement> = [];
  _list.forEach((item) => {
    if (isTCompetition(item)) {
      content.push(<CompetitionCard key={item.id} competition={item}/>);
    }
    if (isTTeam(item)) {
      content.push(<TeamCard key={item.id} team={item}/>);
    }
  });

  return (
    <div className="items_list">
      <SearchField search={search} changeSearchHandler={changeSearchHandler}/>
      <ul className="items_list__cards_block">{content}</ul>
      {searchedLength > PAGE_SIZE &&
      <Paginator pageStart={pageStart} total={searchedLength} setPage={setPageStart}/>}
    </div>
  );
};

export default ItemsList;
