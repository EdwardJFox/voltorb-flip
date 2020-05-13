import seedrandom from 'seedrandom';

import Board from '../board';
import Space, { SpaceTypeEnum, SpaceStatusEnum } from '../space';

describe('Board class', () => {
  describe('#generateSpaces', () => {
    test('creates the expected 2d array structure for the game board', () => {
      const random = seedrandom('testSeed');
      const output = new Board(2).generateSpaces(random);
      
      expect(output.map((spaces: Space[]) => spaces.map((space: Space) => space.type))).toMatchSnapshot();
    });
  });

  describe('#seededElements', () => {
    function expectedValues(expectedOneSpaceCount: number, expectedMultiplerCount: number, expectedVoltorbSpaceCount: number, board: Space[]) {
      const oneSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.One).length;
      const twoSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.Two).length;
      const threeSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.Three).length;
      const voltorbSpaceCount = board.filter((space: Space) => space.type === SpaceTypeEnum.Voltorb).length;
    
      expect(oneSpaceCount).toBe(expectedOneSpaceCount);
      expect(twoSpaceCount + threeSpaceCount).toBe(expectedMultiplerCount);
      expect(voltorbSpaceCount).toBe(expectedVoltorbSpaceCount);
    };

    test('generates the expected array of elements at difficulty 1', () => {
      const random = seedrandom('testSeed');
      const output = new Board(1).seededElements(random);
      expectedValues(16, 3, 6, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 2', () => {
      const random = seedrandom('testSeed');
      const output = new Board(2).seededElements(random);
      expectedValues(14, 4, 7, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 3', () => {
      const random = seedrandom('testSeed');
      const output = new Board(3).seededElements(random);
      expectedValues(12, 5, 8, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 4', () => {
      const random = seedrandom('testSeed');
      const output = new Board(4).seededElements(random);
      expectedValues(10, 6, 9, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 5', () => {
      const random = seedrandom('testSeed');
      const output = new Board(5).seededElements(random);
      expectedValues(8, 7, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 6', () => {
      const random = seedrandom('testSeed');
      const output = new Board(6).seededElements(random);
      expectedValues(7, 8, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 7', () => {
      const random = seedrandom('testSeed');
      const output = new Board(7).seededElements(random);
      expectedValues(6, 9, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 8', () => {
      const random = seedrandom('testSeed');
      const output = new Board(8).seededElements(random);
      expectedValues(5, 10, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });
  });

  describe('#numberOfMultipliers', () => {
    test('it returns 3 for a difficulty of 1', () => {
      // @ts-ignore
      expect(new Board(1).numberOfMultipliers()).toBe(3);
    });

    test('it returns 7 for a difficulty of 5', () => {
      // @ts-ignore
      expect(new Board(5).numberOfMultipliers()).toBe(7);
    });

    test('it returns 10 for a difficulty of 8', () => {
      // @ts-ignore
      expect(new Board(8).numberOfMultipliers()).toBe(10);
    });
  });

  describe('#numberOfVoltorbs', () => {
    test('it returns 6 for a difficulty of 1', () => {
      // @ts-ignore
      expect(new Board(1).numberOfVoltorbs()).toBe(6);
    });

    test('it returns 8 for a difficulty of 3', () => {
      // @ts-ignore
      expect(new Board(3).numberOfVoltorbs()).toBe(8);
    });

    test('it returns 9 for a difficulty of 4', () => {
      // @ts-ignore
      expect(new Board(4).numberOfVoltorbs()).toBe(9);
    });

    test('it returns 10 for a difficulty of 5', () => {
      // @ts-ignore
      expect(new Board(5).numberOfVoltorbs()).toBe(10);
    });

    test('it returns 10 for a difficulty of 8', () => {
      // @ts-ignore
      expect(new Board(8).numberOfVoltorbs()).toBe(10);
    });
  });

  describe('#totalNumberOfSpaces', () => {
    test('it returns 25', () => {
      // @ts-ignore
      expect(new Board(1).totalNumberOfSpaces()).toBe(25);
    });
  });

  describe('#numberOfOneSpaces', () => {
    test('it returns 16 for a difficulty of 1', () => {
      // @ts-ignore
      expect(new Board(1).numberOfOneSpaces()).toBe(16);
    });

    test('it returns 12 for a difficulty of 3', () => {
      // @ts-ignore
      expect(new Board(3).numberOfOneSpaces()).toBe(12);
    });

    test('it returns 5 for a difficulty of 8', () => {
      // @ts-ignore
      expect(new Board(8).numberOfOneSpaces()).toBe(5);
    });
  });

  describe('flipping a card', () => {
    test('I can flip a single card', () => {
      const board = new Board(1);
      const random = seedrandom('testSeed');
      board.buildSpaces(random);
      board.spaces[0][0].flip();
      expect(board.spaces[0][0].state).toBe(SpaceStatusEnum.Flipped);
      expect(board.spaces[0][1].state).toBe(SpaceStatusEnum.Hidden);
    });
  });
});