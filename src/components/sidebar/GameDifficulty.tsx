import React from 'react';

import './GameDifficulty.scss';

interface GameDifficultyInterface {
  difficulty: number;
}

const GameDifficulty = ({ difficulty }: GameDifficultyInterface) =>
  <div className="gameDifficulty">
    <h1>VOLTORB Flip Lvl. {difficulty}</h1>
  </div>

export default GameDifficulty;