import React from 'react';

import { InputModeEnum } from '../VoltorbFlip';

import GameScore from './GameScore';
import GameDifficulty from './GameDifficulty';
import GameInputMode from './GameInputMode';
import Button from '../Button';

import './Sidebar.scss';

interface SidebarPropertiesInterface {
  difficulty: number;
  totalPoints: number;
  currentPoints: number;
  highScore: number;
  handleInputModeChange: (inputMode: InputModeEnum) => void;
  currentInputMode: InputModeEnum;
  handleRestartClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Sidebar = ({ difficulty, totalPoints, currentPoints, highScore, handleInputModeChange, currentInputMode, handleRestartClick }: SidebarPropertiesInterface) =>
  <div className="sidebar">
    <div className="gameMenu">
      <div className="details">
        <GameDifficulty difficulty={difficulty} />
        <GameScore totalScore={totalPoints} currentRoundScore={currentPoints} highScore={highScore} />
      </div>
      <div className="inputs">
        <GameInputMode handleInputModeChange={handleInputModeChange} currentInputMode={currentInputMode} />
        <div className="controls">
          <Button handleOnClick={handleRestartClick} type="secondary">Start new game</Button>
        </div>
      </div>
    </div>
    <footer>
      Created by <a href="https://twitter.com/icemaz" target="_blank" rel="noopener noreferrer">@icemaz</a> - <a href="https://github.com/EdwardJFox/voltorb-flip" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
  </div>

export default Sidebar;