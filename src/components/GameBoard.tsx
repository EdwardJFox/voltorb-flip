import React from 'react';
import Board from '../services/board';
import Space from '../services/space';
import BoardSpace from './BoardSpace';
import BoardRow from './BoardRow';
import BoardSpacesSummary from './BoardSpacesSummary';
import { GameState } from '../services/game';

import './GameBoard.scss';

interface BoardInterface {
  board: Board;
  handleSpaceClick: (space: Space) => void;
  gameState: GameState;
}

const GameBoard = ({ board, handleSpaceClick, gameState }: BoardInterface)  => {
  const { spaces } = board;
  return (
    <div className="board">
      {
        spaces.map((row: Space[], index: number) =>
          <BoardRow key={`boardrow_${index}`} spaces={row} handleSpaceClick={handleSpaceClick} rowIndex={index} />
        )
      }
      <div className="bottomSummary">
        {
          spaces.map((__: any, rowIndex: number) =>
            <BoardSpacesSummary key={`board_column_summary_${rowIndex}`} spaces={buildColumnSpacesForSummary(rowIndex, spaces)} />
          )
        }
      </div>
    </div>
  )
}

function buildColumnSpacesForSummary(index: number, spaces: Space[][]): Space[] {
  return spaces.map(row => row[index]);
}

export default GameBoard;