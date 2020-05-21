import React, { useState } from 'react';

import GameBoard from './board/GameBoard';
import Game, { GameStateEnum } from '../services/game';
import Space, { SpaceStateEnum } from '../services/space';
import GameStateOverlay from './GameStateOverlay';
import Sidebar from './sidebar/Sidebar';

import './VoltorbFlip.scss';

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
  // const [seed, setSeed] = useState(game.seed);
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
    if(space.state === SpaceStateEnum.Hidden && game.state === GameStateEnum.Playing) {
      space.flip();
      game.updateBoardState();
      console.log(game.state);
      if(game.state !== GameStateEnum.Playing) {
        if(game.totalPoints > highScore) {
          setHighScoreInStorage(game.totalPoints);
          setHighScore(game.totalPoints);
        }
        setTimeout(() => {
          game.board.allSpaces().forEach((space: Space) => space.flip());
          setGame(Object.create(game));
        }, 500);
        
        setTimeout(() => {
          setShowOverlay(true);
        }, 2000);
      }
      setGame(Object.create(game));  
    }
  }

  const handleRestartClick = () => {
    game.resetGame();
    game.startRound();
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
            <GameBoard board={game.board} handleSpaceClick={handleSpaceClick} />
            <GameStateOverlay
              gameState={game.state}
              handleRestartClick={handleRestartClick}
              handleNextRoundClick={handleNextRoundClick}
              showOverlay={showOverlay} />
          </div>
          <Sidebar
            difficulty={game.board.difficulty}
            totalPoints={game.totalPoints}
            currentPoints={game.currentRoundPoints}
            highScore={highScore}
            handleInputModeChange={handleInputModeChange}
            currentInputMode={inputMode}
            handleRestartClick={handleRestartClick} />
        </React.Fragment>
      }
    </div>
  )
}

export default VoltorbFlip;