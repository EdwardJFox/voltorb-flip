import React, { useState, useEffect } from 'react';

import './VoltorbFlip.scss';
import GameBoard from './GameBoard';
import Game, { GameState } from '../services/game';
import GameScore from './GameScore';
import Space, { SpaceStatusEnum } from '../services/space';
import GameDifficulty from './GameDifficulty';
import GameStateOverlay from './GameStateOverlay';
import GameInputMode from './GameInputMode';
import Button from './Button';

export enum InputModeEnum {
  MarkingVoltorb,
  MarkingOne,
  MarkingTwo,
  MarkingThree,
  Flipping
}

const localStorage = window.localStorage;

const getHighScoreStorage = () => {
  return parseInt(localStorage.getItem('voltorbFlipHiScore') || '0');
}

const setHighScoreInStorage = (score: number) => {
  localStorage.setItem('voltorbFlipHiScore', score.toString());
}

const VoltorbFlip = () => {
  const [game, setGame] = useState(new Game());
  const [seed, setSeed] = useState(game.seed);
  const [showOverlay, setShowOverlay] = useState(false);
  const [inputMode, setInputMode] = useState(InputModeEnum.Flipping);
  const [highScore, setHighScore] = useState(getHighScoreStorage());

  const handleSpaceClick = (space: Space) => {
    if(inputMode === InputModeEnum.Flipping) {
      handleCardFlip(space);
    } else {
      handleCardMark(space);
    }
  }

  const handleCardMark = (space: Space) => {
    space.mark(inputMode.valueOf());
    setGame(Object.create(game));  
  }

  const handleCardFlip = (space: Space) => {
    if(space.state === SpaceStatusEnum.Hidden && game.state === GameState.Playing) {
      space.flip();
      if(game.checkBoard()) {
        if(game.totalPoints > highScore) {
          setHighScoreInStorage(game.totalPoints);
          setHighScore(game.totalPoints);
        }
        setTimeout(() => {
          game.board.spaces.reduce((spaces: Space[], row: Space[]) => [...spaces, ...row]).forEach((space: Space) => space.flip());
          setGame(Object.create(game));
        }, 500);
        
        setTimeout(() => {
          setShowOverlay(true);
        }, 2000);
      }
      setGame(Object.create(game));  
    }
  }

  useEffect(() => {
    setSeed(game.seed);
    game.setup();
    game.board.buildSpaces(game.random);
    setGame(Object.create(game));
  }, []);

  const handleRestartClick = () => {
    game.resetGame();
    setGame(Object.create(game));  
    setShowOverlay(false);
  }

  const handleNextRoundClick = () => {
    game.nextRound();
    setGame(Object.create(game));  
    setShowOverlay(false);
  }

  const handleInputModeChange = (inputMode: InputModeEnum) => {
    setInputMode(inputMode);
  }

  return (
    <div className="voltorbFlip">
      { game.board && 
        <React.Fragment>
          <div className="boardArea">
            <GameBoard board={game.board} handleSpaceClick={handleSpaceClick} gameState={game.state} />
            <GameStateOverlay gameState={game.state} handleRestartClick={handleRestartClick} handleNextRoundClick={handleNextRoundClick} showOverlay={showOverlay} />
          </div>
          <div className="sidebar">
            <GameDifficulty difficulty={game.difficulty} />
            <GameScore totalScore={game.totalPoints} currentRoundScore={game.currentRoundPoints} highScore={highScore} />
            <GameInputMode handleInputModeChange={handleInputModeChange} currentInputMode={inputMode} />
            <div className="controls">
              <Button handleOnClick={handleRestartClick} type="secondary">Start new game</Button>
            </div>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default VoltorbFlip;