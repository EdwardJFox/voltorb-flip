import React from 'react';
import Space, { SpaceTypeEnum } from '../services/space';

import './BoardSpaceSummary.scss';

interface BoardSpacesSummaryInterface {
  spaces: Space[];
}

const BoardSpacesSummary = ({ spaces }: BoardSpacesSummaryInterface) => {
  console.log("summary")
  return (
    <div className="space spacesSummary">
      <div className="spaceBorder">
        <div className="spaceInner spaceSummaryInner">
          <div className="spacesSummaryMultiplierTotal">{ countOfMultipliers(spaces) }</div>
          <div className="spacesSummaryVoltorbTotal">
            <img src="/voltorb.svg" />
            <span>{ countOfVoltorbs(spaces) }</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function countOfMultipliers(spaces: Space[]): number {
  return spaces.reduce((total, space) => space.type !== SpaceTypeEnum.Voltorb ? total + space.type : total, 0)
}

function countOfVoltorbs(spaces: Space[]): number {
  return spaces.reduce((total, space) => space.type === SpaceTypeEnum.Voltorb ? total + 1 : total, 0)
}

export default BoardSpacesSummary;