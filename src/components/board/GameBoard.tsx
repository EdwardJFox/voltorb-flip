import React from 'react';

import Board from '../../services/board';
import Space from '../../services/space';
import BoardRow from './BoardRow';
import BoardSpacesSummary from './BoardSpacesSummary';
import { getColumnFromBoard } from '../../services/helpers';

import './GameBoard.scss';

interface BoardInterface {
  board: Board;
  handleSpaceClick: (space: Space) => void;
}

const GameBoard = ({ board: { spaces }, handleSpaceClick }: BoardInterface)  =>
  <div id="board">
    {
      spaces.map((row: Space[], index: number) =>
        <BoardRow key={`boardrow_${index}`} spaces={row} handleSpaceClick={handleSpaceClick} rowIndex={index} />
      )
    }
    <div className="bottomSummary">
      {
        spaces.map((__: any, columnIndex: number) =>
          <BoardSpacesSummary key={`board_column_summary_${columnIndex}`} spaces={getColumnFromBoard(columnIndex, spaces)} />
        )
      }
    </div>
  </div>

export default GameBoard;