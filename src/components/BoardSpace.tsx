import React from 'react';
import Space, { SpaceStatusEnum, SpaceTypeEnum } from '../services/space';

import './BoardSpace.scss';

interface SpaceInterface {
  space: Space;
  handleSpaceClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BoardSpace = ({ space, handleSpaceClick }: SpaceInterface) => {
  const handleCardFlip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(space.state === SpaceStatusEnum.Hidden) {
      space.flip();
      handleSpaceClick(e);
    }
  }

  return (
    <div className={`space boardSpace ${space.state === SpaceStatusEnum.Hidden ? 'hidden' : 'flipped' }`} onClick={handleCardFlip}>
      <div className="spaceBorder">
        <div className="spaceInner">
          <div className="spaceFront">

          </div>
          <div className="spaceBack">
            { space.state === SpaceStatusEnum.Flipped &&
              BoardSpaceBackContent(space)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const BoardSpaceBackContent = (space: Space) => {
  switch(space.type) {
    case SpaceTypeEnum.Voltorb:
      return (
        <div className="spaceVoltorb"><span><img src="/voltorb.svg" /></span></div>
      )
    default:
      return (
        <div className="spaceMultiplier"><span>{ space.type }</span></div>
      )
  }
}

export default BoardSpace;