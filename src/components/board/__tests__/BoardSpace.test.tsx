import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import BoardSpace from '../BoardSpace';
import Space, { SpaceTypeEnum } from '../../../services/space';

describe('BoardSpace component', () => {
  test('the space can be clicked on, which passes along the space to the handle method', () => {
    const space = new Space(SpaceTypeEnum.One);
    const handleClickDouble = jest.fn(() => space.flip());

    const { getByTestId } = render(<BoardSpace space={space} handleSpaceClick={handleClickDouble} />);

    fireEvent(
      getByTestId('boardSpaceBack'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClickDouble).toHaveBeenCalled();
    expect(space.isFlipped()).toBeTruthy();
  });

  test('the space shows the correct content after it has been flipped and it is a multiplier', () => {
    const space = new Space(SpaceTypeEnum.Two);
    space.flip();

    const { getByText } = render(<BoardSpace space={space} handleSpaceClick={jest.fn()} />);
    expect(getByText('2')).toBeInTheDocument();
  });

  test('the space shows the correct content after it has been flipped and it is a voltorb', () => {
    const space = new Space(SpaceTypeEnum.Voltorb);
    space.flip();

    const { getByAltText } = render(<BoardSpace space={space} handleSpaceClick={jest.fn()} />);
    expect(getByAltText('Voltorb space')).toBeInTheDocument();
  });
});
