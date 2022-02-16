import React from 'react';
import {ReactComponent as FindIcon} from '../../../content/find.svg';
import './SearchField.scss';

const SearchField: React.FC = () => {
  return (
    <div>
      <input/>
      <FindIcon className="search_field__find_icon"/>
    </div>
  );
};

export default SearchField;
