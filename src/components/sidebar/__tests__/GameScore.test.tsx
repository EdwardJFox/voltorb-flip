import React from 'react';
import { render, waitFor } from '@testing-library/react';

import GameScore from '../GameScore';

import withMarkup from '../../../test/helpers/withMarkup';

describe('GameScore component', () => {
  it('shows the current scores as passed into the element', async () => {
    const { container, getByText } = render(<GameScore totalScore={100} currentRoundScore={200} highScore={300} />);
    const getByTextWithMarkup = withMarkup(getByText);

    await waitFor(() => { 
      expect(getByTextWithMarkup('Total points100')).toBeInTheDocument();
      expect(getByTextWithMarkup('Round points200')).toBeInTheDocument();
      expect(getByTextWithMarkup('High score300')).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});
