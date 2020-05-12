import React from 'react';
import Space, { SpaceStatusEnum, SpaceTypeEnum } from '../services/space';

import './BoardSpace.scss';

interface SpaceInterface {
  space: Space;
  handleSpaceClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, space: Space) => void;
}

const BoardSpace = ({ space, handleSpaceClick }: SpaceInterface) => {

  return (
    <div className={`space boardSpace ${space.state === SpaceStatusEnum.Hidden ? 'hidden' : 'flipped' }`} onClick={(e) => handleSpaceClick(e, space)}>
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