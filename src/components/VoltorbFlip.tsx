import React, { useState, useEffect } from 'react';

import './VoltorbFlip.scss';
import GameBoard from './GameBoard';
import Game from '../services/game';

const VoltorbFlip = () => {
  const [game, setGame] = useState(new Game());
  const [seed, setSeed] = useState(game.seed);

  const handleSpaceClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("board click");
    console.log(game.board.spaces);
    setGame(Object.create(game));
  }

  useEffect(() => {
    setSeed(game.seed);
    game.setup();
    game.board.buildSpaces(game.random);
    setGame(Object.create(game));
  }, []);

  return (
    <div className="voltorbFlip">
      { game.board && 
        <GameBoard board={game.board} handleSpaceClick={handleSpaceClick} gameState={game.state} />
      }
    </div>
  )
}

export default VoltorbFlip;