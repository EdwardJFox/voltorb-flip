import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import GameStateOverlay from '../GameStateOverlay';
import { GameStateEnum } from '../../services/game';

describe('GameStateOverlay component', () => {
  let handleNextRoundClickDouble: jest.Mock;
  let handleRestartClickDouble: jest.Mock;

  beforeEach(() => {
    handleNextRoundClickDouble = jest.fn();
    handleRestartClickDouble = jest.fn();
  });

  describe('with a gamestate of intermission', () => {
    const state = GameStateEnum.Intermission;

    test('the intermission modal is shown', () => {
      const { getByText } = render(
        <GameStateOverlay
          showOverlay={true}
          gameState={state}
          handleNextRoundClick={handleNextRoundClickDouble}
          handleRestartClick={handleRestartClickDouble} />);
  
      expect(getByText('Round complete!')).toBeInTheDocument();
    });

    test('clicking on the next round button calls the next round procedure', () => {
      const { getByText } = render(
        <GameStateOverlay
          showOverlay={true}
          gameState={state}
          handleNextRoundClick={handleNextRoundClickDouble}
          handleRestartClick={handleRestartClickDouble} />);
  
      fireEvent(
        getByText('Next round'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleNextRoundClickDouble).toHaveBeenCalled();
    });
  });

  describe('with a gamestate of round lost', () => {
    const state = GameStateEnum.RoundLost;

    test('the intermission modal is shown', () => {
      const { getByText } = render(
        <GameStateOverlay
          showOverlay={true}
          gameState={state}
          handleNextRoundClick={handleNextRoundClickDouble}
          handleRestartClick={handleRestartClickDouble} />);
  
      expect(getByText('Oh no, a Voltorb!')).toBeInTheDocument();
    });

    test('clicking on the next round button calls the next round procedure', () => {
      const { getByText } = render(
        <GameStateOverlay
          showOverlay={true}
          gameState={state}
          handleNextRoundClick={handleNextRoundClickDouble}
          handleRestartClick={handleRestartClickDouble} />);
  
      fireEvent(
        getByText('Next round'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleNextRoundClickDouble).toHaveBeenCalled();
    });

    test('clicking on the restart button calls the restart game procedure', () => {
      const { getByText } = render(
        <GameStateOverlay
          showOverlay={true}
          gameState={state}
          handleNextRoundClick={handleNextRoundClickDouble}
          handleRestartClick={handleRestartClickDouble} />);
  
      fireEvent(
        getByText('Restart'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleRestartClickDouble).toHaveBeenCalled();
    });
  });

  

  describe('with a gamestate of playing', () => {
    const state = GameStateEnum.Playing;

    test('the intermission modal is not shown', () => {
      const { container } = render(
        <GameStateOverlay
          showOverlay={true}
          gameState={state}
          handleNextRoundClick={handleNextRoundClickDouble}
          handleRestartClick={handleRestartClickDouble} />);
  
      expect(container).toBeEmpty();
    });
  });
});
