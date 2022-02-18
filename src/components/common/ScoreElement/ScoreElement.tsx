import React from 'react';
import './ScoreElement.scss';

type ScoreElementProps = {
  homeTeamScore: number | null,
  awayTeamScore: number | null,
  brackets?: boolean
}

const ScoreElement: React.FC<ScoreElementProps> = ({homeTeamScore, awayTeamScore, brackets= false}) => {
  return (
    <div className="score_element">
      {brackets && <span>(</span>}
      <span>{homeTeamScore === null ? '-' : homeTeamScore}</span>
      <span>:</span>
      <span>{awayTeamScore === null ? '-' : awayTeamScore}</span>
      {brackets && <span>)</span>}
    </div>
  );
};

export default ScoreElement;
