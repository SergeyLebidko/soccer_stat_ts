import React from 'react';
import {ReactComponent as FindIcon} from '../../../content/find.svg';
import './SearchField.scss';

type SearchFieldProps = {
  search: string,
  changeSearchHandler: React.ChangeEventHandler
}

const SearchField: React.FC<SearchFieldProps> = ({search, changeSearchHandler}) => {
  return (
    <div>
      <input className="search_field__field" value={search} onChange={changeSearchHandler}/>
      <FindIcon className="search_field__find_icon"/>
    </div>
  );
};

export default SearchField;
