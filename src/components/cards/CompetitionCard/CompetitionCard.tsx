import React, {useState} from 'react';
import {TCompetition} from '../../../types';
import NoPhoto from '../../common/NoPhoto/NoPhoto';
import {useNavigate} from 'react-router-dom';
import './CompetitionCard.scss';

type CompetitionCardProps = {
  competition: TCompetition
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({competition}) => {
  const navigate = useNavigate();
  const [hasEmblemError, setHasEmblemError] = useState<boolean>(false);

  const emblemErrorHandler = () => setHasEmblemError(true);

  const clickHandler = (): void => navigate(`/competitions/${competition.id}`);

  return (
    <li className="competition_card" onClick={clickHandler}>
      <h1 className="competition_card__title">{competition.name}</h1>
      {competition.emblemUrl === null || hasEmblemError ?
        <NoPhoto/> :
        <img
          className="competition_card__emblem"
          src={competition.emblemUrl}
          onError={emblemErrorHandler}
          alt={`Лига ${competition.name}`}
        />
      }
      <h3 className="competition_card__country">{competition.area.name}</h3>
    </li>
  );
};

export default CompetitionCard;
