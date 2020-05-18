import seedrandom from 'seedrandom';

import Board, { BoardStatusEnum } from '../board';
import Space, { SpaceTypeEnum, SpaceStatusEnum } from '../space';

describe('Board class', () => {
  let random: any;

  beforeEach(() => {
    random = seedrandom('testSeed');
  })

  describe('#buildSpaces', () => {
    it('sets the spaces on the board', () => {
      const board = new Board(1);
      expect(board.spaces).toEqual([]);
      board.buildSpaces(random);
      expect(board.spaces).not.toEqual([]);
    });
  });

  describe('#generateSpaces', () => {
    it('creates the expected 2d array structure for the game board', () => {
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
      const output = new Board(1).seededElements(random);
      expectedValues(16, 3, 6, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 2', () => {
      const output = new Board(2).seededElements(random);
      expectedValues(14, 4, 7, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 3', () => {
      const output = new Board(3).seededElements(random);
      expectedValues(12, 5, 8, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 4', () => {
      const output = new Board(4).seededElements(random);
      expectedValues(10, 6, 9, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 5', () => {
      const output = new Board(5).seededElements(random);
      expectedValues(8, 7, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 6', () => {
      const output = new Board(6).seededElements(random);
      expectedValues(7, 8, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 7', () => {
      const output = new Board(7).seededElements(random);
      expectedValues(6, 9, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });

    test('generates the expected array of elements at difficulty 8', () => {
      const output = new Board(8).seededElements(random);
      expectedValues(5, 10, 10, output);
      expect(output.map((space: Space) => space.type)).toMatchSnapshot();
    });
  });

  describe('#allSpaces', () => {
    it('returns a flattened array of all of the spaces', () => {
      const board = new Board(1);
      board.buildSpaces(random);
      expect(board.spaces.length).toEqual(5);
      expect(board.allSpaces().length).toEqual(25);
      expect(board.allSpaces()[7]).toBe(board.spaces[1][2]);
      expect(board.allSpaces()[18]).toBe(board.spaces[3][3]);
      expect(board.allSpaces()[24]).toBe(board.spaces[4][4]);
    });
  });

  describe('#allMultiplierSpaces', () => {
    it('returns a an array of all the multiplier spaces on the board', () => {
      const board = new Board(1);
      board.buildSpaces(random);
      const multiplierSpaces = board.allMultiplierSpaces();
      expect(multiplierSpaces.length).toEqual(3);
      expect(multiplierSpaces.map((space) => space.type)).
        toEqual([SpaceTypeEnum.Three, SpaceTypeEnum.Three, SpaceTypeEnum.Two]);
    });
  });

  describe('#flippedSpaces', () => {
    it('returns all the flipped spaces on the board as an array', () => {
      const board = new Board(1);
      board.buildSpaces(random);
      
      const firstFlippedSpace = board.spaces[0][0];
      const secondFlippedSpace = board.spaces[2][3];
      const thirdFlippedSpace = board.spaces[4][4];
      
      firstFlippedSpace.flip();
      secondFlippedSpace.flip();
      thirdFlippedSpace.flip();

      const flippedSpaces = board.flippedSpaces();
      expect(flippedSpaces.length).toEqual(3);
      expect(flippedSpaces).toEqual([
        firstFlippedSpace, secondFlippedSpace, thirdFlippedSpace
      ])
    });
  });

  describe('#flippedMultiplierSpaces', () => {
    it('returns all the flipped multiplier spaces on the board', () => {
      const board = new Board(1);
      board.buildSpaces(random);
      
      const firstFlippedSpace = board.spaces[0][0];
      const secondFlippedSpace = board.spaces[2][3];
      const thirdFlippedSpace = board.spaces[4][4];
      
      firstFlippedSpace.flip();
      secondFlippedSpace.flip();
      thirdFlippedSpace.flip();

      const flippedMultiplierSpaces = board.flippedMultiplierSpaces();
      expect(flippedMultiplierSpaces.length).toEqual(1);
      expect(flippedMultiplierSpaces).toEqual([
        firstFlippedSpace
      ]);
    });
  });

  describe('#getCurrentRoundPoints', () => {
    describe('on difficulty 1 with 2 flipped spaces', () => {
      it('returns the expected score of the board', () => {
        const board = new Board(1);
        board.buildSpaces(random);

        // Multiplier x3
        board.spaces[0][0].flip();
        // Multiplier x2
        board.spaces[0][4].flip();
        
        const flippedMultiplierSpaces = board.flippedMultiplierSpaces();
        expect(board.getCurrentRoundPoints()).toEqual(6);
      });
    });

    describe('on difficulty 8 with 9 flipped spaces', () => {
      it('returns the expected score of the board', () => {
        const board = new Board(8);
        board.buildSpaces(random);

        // Multiplier x3
        board.spaces[0][0].flip();
        board.spaces[3][0].flip();
        board.spaces[4][0].flip();
        // Multiplier x2
        board.spaces[0][2].flip();
        board.spaces[0][3].flip();
        board.spaces[1][1].flip();
        board.spaces[2][2].flip();
        board.spaces[3][1].flip();
        board.spaces[4][3].flip();
        
        expect(board.getCurrentRoundPoints()).toEqual(1728);
      });
    });
  });

  describe('#checkBoard', () => {
    let board: Board;

    beforeEach(() => {
      board = new Board(1);
      board.buildSpaces(random);
    });

    describe('if the board is lost', () => {
      beforeEach(() => {
        jest.spyOn(board, 'isBoardLost').mockReturnValue(true);
      });

      it('returns that the state of the board is lost', () => {
        expect(board.checkBoard()).toEqual(BoardStatusEnum.Lost);
      });
    });

    describe('if the board is complete', () => {
      beforeEach(() => {
        jest.spyOn(board, 'isBoardLost').mockReturnValue(false);
        jest.spyOn(board, 'isBoardComplete').mockReturnValue(true);
      });

      it('returns that the state of the board is complete', () => {
        expect(board.checkBoard()).toEqual(BoardStatusEnum.Complete);
      });
    });

    describe('if the board is incomplete but not lost', () => {
      beforeEach(() => {
        jest.spyOn(board, 'isBoardLost').mockReturnValue(false);
        jest.spyOn(board, 'isBoardComplete').mockReturnValue(false);
      });

      it('returns that the state of the board is currently active', () => {
        expect(board.checkBoard()).toEqual(BoardStatusEnum.Active);
      });
    });
  });

  describe('#isBoardLost', () => {
    let board: Board;

    beforeEach(() => {
      board = new Board(1);
      board.buildSpaces(random);
    });

    describe('with a board with no cards flipping', () => {
      beforeEach(() => {
        jest.spyOn(board, 'flippedSpaces').mockReturnValue([]);
      });

      it('returns false', () => {
        expect(board.isBoardLost()).toBeFalsy();
      });
    });

    describe('with a board and some non-voltorb cards flipped', () => {
      beforeEach(() => {
        jest.spyOn(board, 'flippedSpaces').mockReturnValue([
          new Space(1), new Space(2), new Space(3)
        ]);
      });

      it('returns false', () => {
        expect(board.isBoardLost()).toBeFalsy();
      });
    });

    describe('with a board with all the multiplier cards flipped', () => {
      beforeEach(() => {
        jest.spyOn(board, 'flippedSpaces').mockReturnValue([
          new Space(1), new Space(2), new Space(3), new Space(2)
        ]);
        jest.spyOn(board, 'allMultiplierSpaces').mockReturnValue([
          new Space(2), new Space(3), new Space(2)
        ]);
      });

      it('returns false', () => {
        expect(board.isBoardLost()).toBeFalsy();
      });
    });

    describe('with a board which has had a voltorb card flipped', () => {
      beforeEach(() => {
        jest.spyOn(board, 'flippedSpaces').mockReturnValue([
          new Space(1), new Space(2), new Space(3),new Space(0)
        ]);
      });

      it('returns true', () => {
        expect(board.isBoardLost()).toBeTruthy();
      });
    });
  });

  describe('#isBoardComplete', () => {
    let board: Board;

    beforeEach(() => {
      board = new Board(1);
      board.buildSpaces(random);

      jest.spyOn(board, 'allMultiplierSpaces').mockReturnValue([
        new Space(2), new Space(3), new Space(2)
      ]);
    });

    describe('with a board with no cards flipping', () => {
      beforeEach(() => {
        jest.spyOn(board, 'flippedMultiplierSpaces').mockReturnValue([]);
      });

      it('returns false', () => {
        expect(board.isBoardComplete()).toBeFalsy();
      });
    });

    describe('with a board and some non-voltorb cards flipped', () => {
      beforeEach(() => {
        const flippedSpace1 = new Space(2);
        flippedSpace1.flip();
        const flippedSpace2 = new Space(3);
        flippedSpace2.flip();
        jest.spyOn(board, 'flippedMultiplierSpaces').mockReturnValue([
          flippedSpace1, flippedSpace2
        ]);
      });

      it('returns false', () => {
        expect(board.isBoardComplete()).toBeFalsy();
      });
    });

    describe('with a board with all the multiplier cards flipped', () => {
      beforeEach(() => {
        const flippedSpace1 = new Space(2);
        flippedSpace1.flip();
        const flippedSpace2 = new Space(3);
        flippedSpace2.flip();
        const flippedSpace3 = new Space(2);
        flippedSpace3.flip();
        jest.spyOn(board, 'flippedMultiplierSpaces').mockReturnValue([
          flippedSpace1, flippedSpace2, flippedSpace3
        ]);
      });

      it('returns true', () => {
        expect(board.isBoardComplete()).toBeTruthy();
      });
    });

    describe('with a board which has had a voltorb card flipped', () => {
      beforeEach(() => {
        jest.spyOn(board, 'flippedMultiplierSpaces').mockReturnValue([]);
      });

      it('returns false', () => {
        expect(board.isBoardComplete()).toBeFalsy();
      });
    });
  });

  describe('#numberOfMultipliers', () => {
    it('returns 3 for a difficulty of 1', () => {
      // @ts-ignore
      expect(new Board(1).numberOfMultipliers()).toBe(3);
    });

    it('returns 7 for a difficulty of 5', () => {
      // @ts-ignore
      expect(new Board(5).numberOfMultipliers()).toBe(7);
    });

    it('returns 10 for a difficulty of 8', () => {
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
});