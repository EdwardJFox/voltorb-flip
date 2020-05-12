import React from 'react';
import AnimatedNumber from "animated-number-react";

import './GameScore.scss';

interface GameScoreInterface {
  totalScore: number;
  currentRoundScore: number;
}

const GameScore = ({ totalScore, currentRoundScore }: GameScoreInterface) => {
  const formatScore = (value: number) => Math.round(value);

  return (
    <div className="gameScore">
      <div className="gameScoreBorder">
        <div className="total">
          <div className="name">Total points</div>
          <div className="score">
            <AnimatedNumber value={totalScore} formatValue={formatScore} />
          </div>
        </div>
      </div>
      <div className="gameScoreBorder">
        <div className="current">
          <div className="name">Current round</div>
          <div className="score">
            <AnimatedNumber value={currentRoundScore} formatValue={formatScore} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameScore;