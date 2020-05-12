import React from 'react';
import Space from '../services/space';
import BoardSpace from './BoardSpace';
import BoardSpacesSummary from './BoardSpacesSummary';

import './BoardRow.scss';

export interface BoardRowInterface {
  spaces: Space[];
  handleSpaceClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, space: Space) => void;
  rowIndex: number;
}

const BoardRow = ({ spaces, handleSpaceClick, rowIndex }: BoardRowInterface) => {
  return (
    <div className="boardRow">
      { spaces.map((space, columnIndex) => <BoardSpace key={`space_${rowIndex}_${columnIndex}`} space={space} handleSpaceClick={handleSpaceClick} />) }
      <BoardSpacesSummary spaces={spaces} />
    </div>
  )
}

export default BoardRow;