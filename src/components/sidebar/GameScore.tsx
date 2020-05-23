import React from 'react';
import CountUp from 'react-countup';

import './GameScore.scss';

interface GameScoreInterface {
  totalScore: number;
  currentRoundScore: number;
  highScore: number;
}

const GameScore = ({ totalScore, currentRoundScore, highScore }: GameScoreInterface) =>
  <div className="gameScore">
    <div className="gameScoreBorder current">
      <div className="gameScoreInner">
        <div className="name">Round points</div>
        <div className="score">
          <CountUp end={currentRoundScore} duration={0.5} />
        </div>
      </div>
    </div>
    <div className="gameScoreBorder total">
      <div className="gameScoreInner">
        <div className="name">Total points</div>
        <div className="score">
          <CountUp end={totalScore} duration={1} />
        </div>
      </div>
    </div>
    <div className="gameScoreBorder highScore">
      <div className="gameScoreInner">
        <div className="name">High score</div>
        <div className="score">
          <CountUp end={highScore} duration={1.4} />
        </div>
      </div>
    </div>
  </div>

export default GameScore;