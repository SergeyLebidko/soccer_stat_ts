import React, {useState} from 'react';
import {TTeam} from '../../../types';
import NoPhoto from '../../common/NoPhoto/NoPhoto';
import {useNavigate} from 'react-router-dom';
import './TeamCard.scss';

type TeamCardProps = {
  team: TTeam
}

const TeamCard: React.FC<TeamCardProps> = ({team}) => {
  const navigate = useNavigate();
  const [hasEmblemError, setHasEmblemError] = useState<boolean>(false);

  const emblemErrorHandler = () => setHasEmblemError(true);

  const clickHandler = (): void => navigate(`/teams/${team.id}`);

  return (
    <li className="team_card" onClick={clickHandler}>
      <h1 className="team_card__title">{team.name}</h1>
      {team.crestUrl === null || hasEmblemError ?
        <NoPhoto/> :
        <img
          className="team_card__emblem"
          src={team.crestUrl}
          onError={emblemErrorHandler}
          alt={`Команда ${team.name}`}
        />
      }
    </li>
  );
};

export default TeamCard;
