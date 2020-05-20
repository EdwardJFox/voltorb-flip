import React from 'react';
import Space, { SpaceStateEnum, SpaceTypeEnum, SpaceMarkersEnum } from '../services/space';

import VoltorbMarker from '../images/voltorb_marker.svg';
import Voltorb from '../images/voltorb.svg';

import './BoardSpace.scss';

interface SpaceInterface {
  space: Space;
  handleSpaceClick: (space: Space) => void;
}

const BoardSpace = ({ space, handleSpaceClick }: SpaceInterface) =>
  <div className={`space boardSpace ${space.state === SpaceStateEnum.Hidden ? 'hidden' : 'flipped' }`}>
    <div className="spaceBorder">
      <div className="spaceInner">
        <div className="spaceFront" onClick={(e) => handleSpaceClick(space)}>
          <div className="markers">
            { space.markers.map((marker: SpaceMarkersEnum) => <BoardSpaceMarker marker={marker} />) }
          </div>
        </div>
        <div className="spaceBack">
          { space.state === SpaceStateEnum.Flipped &&
            BoardSpaceBackContent(space)
          }
        </div>
      </div>
    </div>
  </div>

const BoardSpaceMarker = ({ marker }: { marker: SpaceMarkersEnum }) =>
  <div className={`boardSpaceMarker marker_${marker.toString()}`}>
    { BoardSpaceMarkerContent(marker) }
  </div>

const BoardSpaceMarkerContent = (marker: SpaceMarkersEnum) => {
  switch(marker) {
    case SpaceMarkersEnum.Voltorb:
      return <img src={VoltorbMarker} alt="Voltorb marker" />
    default:
      return <span>{ marker }</span>
  }
}

const BoardSpaceBackContent = (space: Space) => {
  switch(space.type) {
    case SpaceTypeEnum.Voltorb:
      return (
        <div className="spaceVoltorb"><span><img src={Voltorb} alt="Voltorb space" /></span></div>
      )
    default:
      return (
        <div className="spaceMultiplier"><span>{ space.type }</span></div>
      )
  }
}

export default BoardSpace;