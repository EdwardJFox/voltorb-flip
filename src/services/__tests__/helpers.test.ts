import { totalOfMultipliers, countOfVoltorbs, getColumnFromBoard as getColumnFromSpaces } from '../helpers';
import Space, { SpaceTypeEnum } from '../space';

describe('totalOfMultipliers', () => {
  it('returns 0 with an array of spaces with no multipliers (only voltorb spaces)', () => {
    const spaces = [
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.Voltorb)
    ];

    expect(totalOfMultipliers(spaces)).toEqual(0);
  });

  it('returns the total of all of the multipliers, including one spaces', () => {
    const spaces = [
      new Space(SpaceTypeEnum.Two),
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.One),
      new Space(SpaceTypeEnum.One),
      new Space(SpaceTypeEnum.Three)
    ];

    expect(totalOfMultipliers(spaces)).toEqual(7);
  });
});

describe('countOfVoltorbs', () => {
  it('returns 0 with an array of spaces with no voltorbs (only multipliers spaces)', () => {
    const spaces = [
      new Space(SpaceTypeEnum.One),
      new Space(SpaceTypeEnum.One),
      new Space(SpaceTypeEnum.Two),
      new Space(SpaceTypeEnum.One),
      new Space(SpaceTypeEnum.Three)
    ];

    expect(countOfVoltorbs(spaces)).toEqual(0);
  });

  it('returns the number of voltorbs in a row', () => {
    const spaces = [
      new Space(SpaceTypeEnum.Two),
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.One),
      new Space(SpaceTypeEnum.Voltorb),
      new Space(SpaceTypeEnum.Three)
    ];

    expect(countOfVoltorbs(spaces)).toEqual(2);
  });
});

describe('getColumnFromSpaces', () => {
  it('returns the column values given a particular column index', () => {
    const boardSpaces = [
      [new Space(SpaceTypeEnum.Two), new Space(SpaceTypeEnum.Voltorb), new Space(SpaceTypeEnum.One)],
      [new Space(SpaceTypeEnum.One), new Space(SpaceTypeEnum.One), new Space(SpaceTypeEnum.Three)],
      [new Space(SpaceTypeEnum.One), new Space(SpaceTypeEnum.Two), new Space(SpaceTypeEnum.Voltorb)]
    ]

    expect(getColumnFromSpaces(1, boardSpaces)).toStrictEqual([
      boardSpaces[0][1],
      boardSpaces[1][1],
      boardSpaces[2][1]
    ]);
  });
});