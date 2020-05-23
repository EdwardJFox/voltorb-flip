import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import GameInputMode from '../GameInputMode';
import { InputModeEnum } from '../../VoltorbFlip';

describe('GameInputMode component', () => {
  let handleInputModeChangeDouble: any;

  beforeEach(() => {
    handleInputModeChangeDouble = jest.fn();
  });

  describe('clicking on marking modes', () => {
    test('clicking on the 1 marking mode space calls the callback to set marking mode to marking ones', () => {
      const { getByText } = render(<GameInputMode
          currentInputMode={InputModeEnum.Flipping}
          handleInputModeChange={handleInputModeChangeDouble} />);
  
      fireEvent(
        getByText('1'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleInputModeChangeDouble).toHaveBeenCalledWith(InputModeEnum.MarkingOne);
    });
  
    test('clicking on the 2 marking mode space calls the callback to set marking mode to marking twos', () => {
      const { getByText } = render(<GameInputMode currentInputMode={InputModeEnum.Flipping} handleInputModeChange={handleInputModeChangeDouble} />);
  
      fireEvent(
        getByText('2'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleInputModeChangeDouble).toHaveBeenCalledWith(InputModeEnum.MarkingTwo);
    });
  
    test('clicking on the 3 marking mode space calls the callback to set marking mode to marking threes', () => {
      const { getByText } = render(<GameInputMode currentInputMode={InputModeEnum.Flipping} handleInputModeChange={handleInputModeChangeDouble} />);
  
      fireEvent(
        getByText('3'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleInputModeChangeDouble).toHaveBeenCalledWith(InputModeEnum.MarkingThree);
    });
  
    test('clicking on the voltorb marking mode space calls the callback to set marking mode to marking voltorbs', () => {
      const { getByAltText } = render(<GameInputMode currentInputMode={InputModeEnum.Flipping} handleInputModeChange={handleInputModeChangeDouble} />);
  
      fireEvent(
        getByAltText('Voltorb marker'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleInputModeChangeDouble).toHaveBeenCalledWith(InputModeEnum.MarkingVoltorb);
    });
  
    test('clicking on the flip input mode space calls the callback to set input mode to flipping cards', () => {
      const { getByText } = render(<GameInputMode currentInputMode={InputModeEnum.Flipping} handleInputModeChange={handleInputModeChangeDouble} />);
  
      fireEvent(
        getByText('Flip'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleInputModeChangeDouble).toHaveBeenCalledWith(InputModeEnum.Flipping);
    });
  });

  test('the current input mode is highlighted on the UI', () => {
    const { container } = render(<GameInputMode currentInputMode={InputModeEnum.MarkingOne} handleInputModeChange={handleInputModeChangeDouble} />);
    expect(container.querySelector('.marker.selected')).toHaveClass('one');
  });
});
