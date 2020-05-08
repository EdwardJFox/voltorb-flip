import Board from '../board';
import Space, { SpaceTypeEnum } from '../space';

describe('Board class', () => {
  describe('#generateSpaces', () => {
    test('creates the expected 2d array structure for the game board', () => {
      const output = new Board(2, 'testSeed').generateSpaces();
      expect(output.map((spaces: Space[]) => spaces.map((space: Space) => space.type))).toEqual([
        [0, 2, 0, 0, 3],
        [3, 3, 2, 0, 0],
        [0, 3, 0, 0, 3],
        [0, 0, 1, 0, 0],
        [0, 0, 2, 3, 3]
      ]);
    });
  });

  describe('#seededElements', () => {
    test('generates the expected array of elements at difficulty 1', () => {
      const output = new Board(1, 'testSeed').seededElements();
      expectValues(16, 3, 6, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        0, 2, 0, 0, 0,
        3, 0, 3, 0, 0,
        0, 3, 0, 0, 3,
        0, 0, 1, 0, 0,
        0, 0, 2, 3, 3
      ]);
    });

    test('generates the expected array of elements at difficulty 2', () => {
      const output = new Board(2, 'testSeed').seededElements();
      expectValues(14, 4, 7, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        0, 2, 0, 0, 3,
        3, 3, 2, 0, 0,
        0, 3, 0, 0, 3,
        0, 0, 1, 0, 0,
        0, 0, 2, 3, 3
      ]);
    });

    test('generates the expected array of elements at difficulty 3', () => {
      const output = new Board(3, 'testSeed').seededElements();
      expectValues(12, 5, 8, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        0, 2, 0, 0, 3,
        3, 3, 2, 0, 0,
        0, 3, 0, 0, 1,
        0, 0, 1, 0, 3,
        0, 3, 2, 3, 3
      ]);
    });

    test('generates the expected array of elements at difficulty 4', () => {
      const output = new Board(4, 'testSeed').seededElements();
      expectValues(10, 6, 9, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        0, 2, 0, 0, 3,
        3, 3, 2, 3, 0,
        0, 1, 0, 3, 1,
        0, 0, 1, 0, 3,
        0, 3, 2, 3, 3
      ]);
    });

    test('generates the expected array of elements at difficulty 5', () => {
      const output = new Board(5, 'testSeed').seededElements();
      expectValues(8, 7, 10, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        3, 2, 0, 0, 3,
        3, 3, 2, 3, 3,
        0, 1, 0, 3, 1,
        0, 0, 1, 0, 3,
        0, 3, 2, 3, 1
      ]);
    });

    test('generates the expected array of elements at difficulty 6', () => {
      const output = new Board(6, 'testSeed').seededElements();
      expectValues(7, 8, 10, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        3, 2, 0, 0, 3,
        3, 3, 2, 3, 3,
        3, 1, 0, 3, 1,
        0, 0, 1, 0, 3,
        0, 3, 2, 1, 1
      ]);
    });

    test('generates the expected array of elements at difficulty 7', () => {
      const output = new Board(7, 'testSeed').seededElements();
      expectValues(6, 9, 10, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        3, 2, 0, 3, 3,
        1, 3, 2, 3, 3,
        3, 1, 0, 3, 1,
        0, 0, 1, 0, 3,
        0, 3, 2, 1, 1
      ]);
    });

    test('generates the expected array of elements at difficulty 8', () => {
      const output = new Board(8, 'testSeed').seededElements();
      expectValues(5, 10, 10, output);
      expect(output.map((space: Space) => space.type)).toEqual([
        3, 2, 0, 3, 3,
        1, 1, 2, 3, 3,
        3, 1, 0, 3, 1,
        0, 0, 1, 3, 3,
        0, 3, 2, 1, 1
      ]);
    });
  });
});

function expectValues(expectedOneSpaceCount: number, expectedMultiplerCount: number, expectedVoltorbSpaceCount: number, board: Space[]) {
  const oneSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.One).length;
  const twoSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.Two).length;
  const threeSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.Three).length;
  const voltorbSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.Voltorb).length;

  expect(oneSpaceCount).toBe(expectedOneSpaceCount);
  expect(twoSpaceCount + threeSpaceCount).toBe(expectedMultiplerCount);
  expect(voltorbSpaceCount).toBe(expectedVoltorbSpaceCount);
};