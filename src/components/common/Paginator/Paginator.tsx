import React from 'react';
import {ReactComponent as Left} from '../../../content/left.svg';
import {ReactComponent as Right} from '../../../content/right.svg';
import {PAGE_SIZE} from '../../../settings';
import './Paginator.scss';
import classNames from 'classnames';

type PaginatorProps = {
  pageStart: number,
  total: number,
  setPage: (nextPage: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({pageStart, total, setPage}) => {
  const getCurrentPageIndex = (): number => Math.floor(pageStart / PAGE_SIZE) + 1;
  const getLastPageIndex = (): number => Math.ceil(total / PAGE_SIZE);
  const isFirstPage = (): boolean => pageStart === 0;
  const isLastPage = (): boolean => pageStart >= (total - PAGE_SIZE);

  const curIdx = getCurrentPageIndex();
  const lstIdx = getLastPageIndex();

  const content: Array<React.ReactElement> = [];

  const getLinkClasses = (index: number): string => {
    return classNames('paginator__link', {'paginator__link_current': index === curIdx});
  };

  let idx = 1;
  let dotAllow = true;
  for (let page = 0; page <= total; page += (PAGE_SIZE - 1)) {
    if (idx <= 2 || idx >= (lstIdx - 1) || (idx >= (curIdx - 1) && idx <= (curIdx + 1))) {
      content.push(
          <span key={idx} className={getLinkClasses(idx)} onClick={() => setPage((idx - 1) * PAGE_SIZE)}>
            {idx}
          </span>,
      );
      dotAllow = true;
    } else if (dotAllow) {
      content.push(<span key={idx} className="paginator__link">...</span>);
      dotAllow = false;
    }

    idx++;
  }

  const toLeft = (): void => {
    if (!isFirstPage()) {
      setPage(pageStart - PAGE_SIZE);
    }
  };

  const toRight = (): void => {
    if (!isLastPage()) {
      setPage(pageStart + PAGE_SIZE);
    }
  };

  if (!isFirstPage()) {
    content.unshift(<Left className="paginator__arrow" onClick={toLeft}/>);
  }
  if (!isLastPage()) {
    content.push(<Right className="paginator__arrow" onClick={toRight}/>);
  }

  return (
    <div className="paginator">
      {content}
    </div>
  );
};

export default Paginator;
