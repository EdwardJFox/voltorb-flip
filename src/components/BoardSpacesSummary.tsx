import React from 'react';
import Space, { SpaceTypeEnum } from '../services/space';

interface BoardSpacesSummaryInterface {
  spaces: Space[];
}

const BoardSpacesSummary = ({ spaces }: BoardSpacesSummaryInterface) => {
  console.log("summary")
  return (
    <div className="spacesSummary">
      <div className="spacesSummaryMultiplierTotal">{ countOfMultipliers(spaces) }</div>
      <div className="spacesSummaryVoltorbTotal">{ countOfVoltorbs(spaces) }</div>
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