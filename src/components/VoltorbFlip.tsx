import React, { useState, useEffect } from 'react';

import './VoltorbFlip.scss';
import GameBoard from './GameBoard';
import Game, { GameState } from '../services/game';
import GameScore from './GameScore';
import Space, { SpaceStatusEnum } from '../services/space';
import GameDifficulty from './GameDifficulty';
import GameStateOverlay from './GameStateOverlay';

const VoltorbFlip = () => {
  const [game, setGame] = useState(new Game());
  const [seed, setSeed] = useState(game.seed);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSpaceClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, space: Space) => {
    if(space.state === SpaceStatusEnum.Hidden && game.state === GameState.Playing) {
      space.flip();
      if(game.checkBoard()) {
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
            <GameScore totalScore={game.totalPoints} currentRoundScore={game.currentRoundPoints} />
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default VoltorbFlip;