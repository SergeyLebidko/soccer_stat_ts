import React, {useContext, useEffect, useState} from 'react';
import {DataType, TCompetition, TContextType, TTeam} from '../../../types';
import CompetitionCard from '../../cards/CompetitionCard/CompetitionCard';
import SearchField from '../../common/SearchField/SearchField';
import Paginator from '../../common/Paginator/Paginator';
import TeamCard from '../../cards/TeamCard/TeamCard';
import {PAGE_SIZE} from '../../../settings';
import {AppContext} from '../../../context';
import './ItemsList.scss';
import {getPaginatedList} from '../../../utils/common_utils';

type ItemListProps = {
  listType: DataType
}

const ItemsList: React.FC<ItemListProps> = ({listType}) => {
  const [pageStart, setPageStart] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const context: TContextType = useContext(AppContext);
  let list: Array<TCompetition | TTeam> = [];

  if (listType === 'competition') {
    list = context.competitionList;
  }
  if (listType === 'team') {
    list = context.teamList;
  }

  // При изменении исходного списка - сбрасываем параметры пагинации
  useEffect(() => {
    setPageStart(0);
  }, [listType]);

  const changeSearchHandler = (event: React.ChangeEvent): void => {
    setSearch((event.target as HTMLInputElement).value);
    setPageStart(0);
  };

  // Отсекаем элементы, не подходящие под критерии поиска
  if (search.length > 0) {
    const _search = search.toLowerCase();
    list = list.filter((item: TCompetition | TTeam): boolean => {
      if (listType === 'competition') {
        const {name: cName, area: {name: aName}} = item as TCompetition;
        return cName.toLowerCase().includes(_search) || aName.toLowerCase().includes(_search);
      } else {
        return item.name.toLowerCase().includes(_search);
      }
    });
  }
  const searchedLength = list.length;

  // Применяем пагинацию
  list = getPaginatedList(list, pageStart);

  // Формируем контент (итоговый список элементов React)
  const content: Array<React.ReactElement> = [];
  list.forEach((item) => {
    if (listType === 'competition') {
      content.push(<CompetitionCard key={item.id} competition={item as TCompetition}/>);
    }
    if (listType === 'team') {
      content.push(<TeamCard key={item.id} team={item as TTeam}/>);
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
