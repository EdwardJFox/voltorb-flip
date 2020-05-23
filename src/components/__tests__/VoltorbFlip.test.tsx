import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Game from "../../services/game";
import withMarkup from '../../test/helpers/withMarkup';

beforeEach(() => {
  // @ts-ignore
  jest.spyOn(Game.prototype, 'randomSeed').mockReturnValue('testSeed');
});

afterEach(() => {    
  jest.clearAllMocks();
});

import VoltorbFlip from '../VoltorbFlip';
import Board from '../../services/board';

/**
 * This is what the board looks like for each of these tests:
 * 3, 0, 1, 3, 2
 * 1, 1, 0, 1, 1
 * 1, 1, 1, 1, 0
 * 0, 1, 0, 1, 1
 * 0, 1, 1, 1, 1
 */

function clickOnElement(element: HTMLElement) {
  fireEvent(
    element,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
}

describe('VoltorbFlip game', () => {
  test('I can click on spaces in the board, which updates the boards state', async () => {
    const { getAllByTestId, getByText } = render(<VoltorbFlip />);
    const getByTextWithMarkup = withMarkup(getByText);
    const allSpaces = getAllByTestId('boardSpaceBack');

    clickOnElement(allSpaces[0]);
    expect(allSpaces[0].parentNode?.textContent).toEqual('3');
    await waitFor(() => { 
      expect(getByTextWithMarkup('Round points3')).toBeInTheDocument();
    }, { timeout: 600 });
  });

  test('I can click on all the multipliers on the board, which completes the round and lets me move onto the next round', async () => {
    const { getAllByTestId, getByText } = render(<VoltorbFlip />);
    const getByTextWithMarkup = withMarkup(getByText);
    const allSpaces = getAllByTestId('boardSpaceBack');

    clickOnElement(allSpaces[0]);
    clickOnElement(allSpaces[3]);
    clickOnElement(allSpaces[4]);
    
    await waitFor(() => { 
      expect(getByTextWithMarkup('Round points0')).toBeInTheDocument();
      expect(getByTextWithMarkup('Total points18')).toBeInTheDocument();
      expect(getByTextWithMarkup('High score18')).toBeInTheDocument();
      expect(getByText('Round complete!')).toBeInTheDocument();

      clickOnElement(getByText('Next round'));
      expect(getByText('VOLTORB Flip Lvl. 2'));
    }, { timeout: 2000 });
  });

  test('If I click on a voltorb space, I lose the round', async () => {
    const { getAllByTestId, getByText } = render(<VoltorbFlip />);
    const getByTextWithMarkup = withMarkup(getByText);
    const allSpaces = getAllByTestId('boardSpaceBack');

    clickOnElement(allSpaces[1]);
    
    await waitFor(() => { 
      expect(getByTextWithMarkup('Round points0')).toBeInTheDocument();
      expect(getByTextWithMarkup('Total points0')).toBeInTheDocument();
      expect(getByTextWithMarkup('High score0')).toBeInTheDocument();
      expect(getByText('Oh no, a Voltorb!')).toBeInTheDocument();

      clickOnElement(getByText('Next round'));
      expect(getByText('VOLTORB Flip Lvl. 1')).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});