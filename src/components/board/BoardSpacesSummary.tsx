import React from 'react';

import Space from '../../services/space';
import { totalOfMultipliers, countOfVoltorbs } from '../../services/helpers';

import Voltorb from '../../images/voltorb.svg';
import './BoardSpaceSummary.scss';

interface BoardSpacesSummaryInterface {
  spaces: Space[];
}

const BoardSpacesSummary = ({ spaces }: BoardSpacesSummaryInterface) =>
  <div className="space spacesSummary">
    <div className="spaceBorder">
      <div className="spaceInner spaceSummaryInner">
        <div className="spacesSummaryMultiplierTotal">{ totalOfMultipliers(spaces) }</div>
        <div className="spacesSummaryVoltorbTotal">
          <img src={Voltorb} alt="Voltorb" />
          <span>{ countOfVoltorbs(spaces) }</span>
        </div>
      </div>
    </div>
  </div>

export default BoardSpacesSummary;