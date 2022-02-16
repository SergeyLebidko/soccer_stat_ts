import React, {useState} from 'react';
import {TCompetition} from '../../../types';
import './CompetitionCard.scss';

type CompetitionCardProps = {
  competition: TCompetition
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({competition}) => {
  const [hasEmblemError, setHasEmblemError] = useState<boolean>(false);

  const emblemErrorHandler = () => setHasEmblemError(true);

  return (
    <li className="competition_card">
      <h1 className="competition_card__title">{competition.name}</h1>
      {competition.emblemUrl === null || hasEmblemError ?
        <div className="competition_card__no_emblem">нет фото...</div> :
        <img className="competition_card__emblem" src={competition.emblemUrl} onError={emblemErrorHandler}/>
      }
      <h3 className="competition_card__country">{competition.area.name}</h3>
    </li>
  );
};

export default CompetitionCard;
