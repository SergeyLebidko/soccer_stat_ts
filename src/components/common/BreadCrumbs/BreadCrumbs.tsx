import React from 'react';
import './BreadCrumbs.scss';

type BreadCrumbsProps = {
  link: React.ReactElement,
  title: string
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({link, title}) => {
  return (
    <div className="bread_crumbs">
      <span>{link}</span>
      <span>&gt;</span>
      <span>{title}</span>
    </div>
  );
};

export default BreadCrumbs;
