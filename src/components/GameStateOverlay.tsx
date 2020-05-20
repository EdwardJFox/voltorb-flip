import React from 'react';
import { GameStateEnum } from '../services/game';
import Button from './Button';

import './GameStateOverlay.scss';

const Overlay = ({ children, show, className='' }: any) =>
  <div className={`overlay ${className} ${show ? 'show' : ''}`}>
    <div className="overlayInner" >
      { children }
    </div>
  </div>

const GameIntermissionOverlay = ({ handleNextRoundClick }: any) =>
  <React.Fragment>
    <h2>Round complete!</h2>
    <Button handleOnClick={handleNextRoundClick} type="primary">Next round</Button>
  </React.Fragment>

const GameRoundLostOverlay = ({ handleNextRoundClick, handleRestartClick }: any) =>
  <React.Fragment>
    <h2>Oh no a Voltorb!</h2>
    <div className="btnGroup">
      <Button handleOnClick={handleRestartClick} type="default">Restart</Button>
      <Button handleOnClick={handleNextRoundClick} type="primary">Next round</Button>
    </div>
  </React.Fragment>

interface GameStateOverlayInterface {
  gameState: GameStateEnum;
  showOverlay: boolean;
  handleNextRoundClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleRestartClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const GameStateOverlay = ({ showOverlay, gameState, handleNextRoundClick, handleRestartClick }: GameStateOverlayInterface) => {
  switch(gameState){
    case GameStateEnum.Intermission: {
      return <Overlay show={showOverlay}><GameIntermissionOverlay handleNextRoundClick={handleNextRoundClick} /></Overlay>
    }
    case GameStateEnum.RoundLost: {
      return <Overlay show={showOverlay} className="intermission"><GameRoundLostOverlay handleNextRoundClick={handleNextRoundClick} handleRestartClick={handleRestartClick} /></Overlay>
    }
    default: {
      return null;
    }
  }
}

export default GameStateOverlay;