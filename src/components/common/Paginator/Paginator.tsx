import React from 'react';
import {ReactComponent as Left} from '../../../content/left.svg';
import {ReactComponent as Right} from '../../../content/right.svg';
import {PAGE_SIZE} from '../../../settings';
import classNames from 'classnames';
import './Paginator.scss';

type PaginatorProps = {
  pageStart: number,
  total: number,
  setPage: (nextPage: number) => void
}

type LinkData = {
  page: number,
  display: string
}

const Paginator: React.FC<PaginatorProps> = ({pageStart, total, setPage}) => {
  const data: Array<LinkData> = [];

  for (let page=0; page<total; page += PAGE_SIZE) {
    let hasDot = true;
    hasDot = hasDot && page > PAGE_SIZE;
    hasDot = hasDot && page < (total - PAGE_SIZE * 2);
    hasDot = hasDot && (page < (pageStart - PAGE_SIZE) || page > (pageStart + PAGE_SIZE));

    if (hasDot && data.length > 0 && data[data.length - 1].display === '...') {
      continue;
    }

    data.push({
      page: (hasDot ? (page < pageStart ? pageStart - PAGE_SIZE * 2 : pageStart + PAGE_SIZE * 2) : page),
      display: (hasDot ? '...' : Math.floor(page / PAGE_SIZE) + 1 + ''),
    });
  }

  const linkClasses = (page: number): string => {
    return classNames('paginator__link', {'paginator__link_current': page === pageStart});
  };

  const linkClickHandler = (page: number): void => {
    if (page !== pageStart) setPage(page);
  };

  const toLeft = (): void => setPage(pageStart - PAGE_SIZE);
  const toRight = (): void => setPage(pageStart + PAGE_SIZE);

  return (
    <div className="paginator">
      {pageStart > 0 && <Left className="paginator__arrow" onClick={toLeft}/>}
      {data.map(({page, display}, index) =>
        <span key={index} className={linkClasses(page)} onClick={()=>linkClickHandler(page)}>{display}</span>)
      }
      {pageStart < (total - PAGE_SIZE) && <Right className="paginator__arrow" onClick={toRight}/>}
    </div>
  );
};

export default Paginator;
