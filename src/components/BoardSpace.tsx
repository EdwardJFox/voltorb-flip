import React from 'react';
import Space from '../services/space';

interface SpaceInterface {
  space: Space;
  handleSpaceClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BoardSpace = ({ space, handleSpaceClick }: SpaceInterface) => {
  const handleCardFlip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("space click");
    space.flip();
    handleSpaceClick(e);
  }

  return (
    <div className="space" onClick={handleCardFlip}>
      <p>Status: { space.state === 0 ? 'Hidden' : 'Flipped' }</p>
      <p>Score: { space.type }</p>
    </div>
  )
}

export default BoardSpace;