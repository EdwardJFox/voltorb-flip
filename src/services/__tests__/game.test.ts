import seedrandom from 'seedrandom';

import Game, { GameState } from '../game';
import Space, { SpaceTypeEnum } from '../space';

describe('Game class', () => {
  describe('#checkBoard', () => {
    let game = new Game();
    
    beforeEach(() => {
      game = new Game();
      game.board.buildSpaces(seedrandom('test'));
    });

    describe('with a voltorb space flipped', () => {
      beforeEach(() => {
        game.board.spaces[0][2].flip();
      });

      it('returns the Lost state to highlight the board is lost', () => {
        expect(game.checkBoard()).toEqual(GameState.RoundLost);
      });
    });

  });

  describe('#handleLostRound', () => {
    const game = new Game();

    test.each`
      difficulty    | multipliersFlipped  | expectedDifficulty
      ${1}          | ${0}                | ${1}
      ${1}          | ${1}                | ${1}
      ${1}          | ${2}                | ${1}

      ${2}          | ${0}                | ${1}
      ${2}          | ${1}                | ${1}
      ${2}          | ${2}                | ${2}
      ${2}          | ${3}                | ${2}
      
      ${3}          | ${0}                | ${1}
      ${3}          | ${1}                | ${1}
      ${3}          | ${2}                | ${2}
      ${3}          | ${3}                | ${3}
      ${3}          | ${4}                | ${3}
      
      ${4}          | ${0}                | ${1}
      ${4}          | ${1}                | ${1}
      ${4}          | ${2}                | ${2}
      ${4}          | ${3}                | ${3}
      ${4}          | ${4}                | ${4}
      ${4}          | ${5}                | ${4}
      
      ${5}          | ${0}                | ${1}
      ${5}          | ${1}                | ${1}
      ${5}          | ${2}                | ${2}
      ${5}          | ${3}                | ${3}
      ${5}          | ${4}                | ${4}
      ${5}          | ${5}                | ${5}
      ${5}          | ${6}                | ${5}
      
      ${6}          | ${0}                | ${1}
      ${6}          | ${1}                | ${1}
      ${6}          | ${2}                | ${2}
      ${6}          | ${3}                | ${3}
      ${6}          | ${4}                | ${4}
      ${6}          | ${5}                | ${5}
      ${6}          | ${6}                | ${6}
      ${6}          | ${7}                | ${6}
      
      ${7}          | ${0}                | ${1}
      ${7}          | ${1}                | ${1}
      ${7}          | ${2}                | ${2}
      ${7}          | ${3}                | ${3}
      ${7}          | ${4}                | ${4}
      ${7}          | ${5}                | ${5}
      ${7}          | ${6}                | ${6}
      ${7}          | ${7}                | ${7}
      ${7}          | ${8}                | ${7}
      
      ${8}          | ${0}                | ${1}
      ${8}          | ${1}                | ${1}
      ${8}          | ${2}                | ${2}
      ${8}          | ${3}                | ${3}
      ${8}          | ${4}                | ${4}
      ${8}          | ${5}                | ${5}
      ${8}          | ${6}                | ${6}
      ${8}          | ${7}                | ${7}
      ${8}          | ${8}                | ${8}
      ${8}          | ${9}                | ${8}
    `("with the difficulty set to $difficulty, and $multipliersFlipped multipliers are flipped, it sets the difficulty to $expectedDifficulty", ({ difficulty, multipliersFlipped, expectedDifficulty }) => {
      game.board.difficulty = difficulty
      game.flippedMultipliers = multipliersFlipped;
      game.handleLostRound();
      expect(game.board.difficulty).toBe(expectedDifficulty);
    });
  });
});