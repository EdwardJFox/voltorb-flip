import React from 'react';

import { InputModeEnum } from './VoltorbFlip';

import './GameInputMode.scss';

interface GameInputModeInterface {
  currentInputMode: InputModeEnum;
  handleInputModeChange: (inputMode: InputModeEnum) => void;
}

const GameInputMode = ({ currentInputMode, handleInputModeChange }: GameInputModeInterface) => {
  return(
    <div className="gameInputMode">
      <div className="markers">
        <div
          className={`marker voltorb ${currentInputMode === InputModeEnum.MarkingVoltorb ? 'selected' : ''}`}
          onClick={() => handleInputModeChange(InputModeEnum.MarkingVoltorb)}>
            <img src="/voltorb_marker.svg" />
        </div>
        <div
          className={`marker text one ${currentInputMode === InputModeEnum.MarkingOne ? 'selected' : ''}`}
          onClick={() => handleInputModeChange(InputModeEnum.MarkingOne)}>
            <span>1</span>
        </div>
        <div
          className={`marker text two ${currentInputMode === InputModeEnum.MarkingTwo ? 'selected' : ''}`}
          onClick={() => handleInputModeChange(InputModeEnum.MarkingTwo)}>
            <span>2</span>
        </div>
        <div
          className={`marker text three ${currentInputMode === InputModeEnum.MarkingThree ? 'selected' : ''}`}
          onClick={() => handleInputModeChange(InputModeEnum.MarkingThree)}>
            <span>3</span>
        </div>
      </div>
      <div className={`flip ${currentInputMode === InputModeEnum.Flipping ? 'selected' : ''}`} onClick={() => handleInputModeChange(InputModeEnum.Flipping)}>
        <span>Flip</span>
      </div>
    </div>
  )
}

export default GameInputMode;