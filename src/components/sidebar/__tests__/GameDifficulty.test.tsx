import React from 'react';
import { render } from '@testing-library/react';

import GameDifficulty from '../GameDifficulty';

describe('GameDifficulty component', () => {
  it('shows the current difficulty as expected according to the original game', () => {
    const { getByText } = render(<GameDifficulty difficulty={7} />);
    expect(getByText('VOLTORB Flip Lvl. 7')).toBeInTheDocument();
  });
});
