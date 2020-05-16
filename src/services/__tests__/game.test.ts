import seedrandom from 'seedrandom';

import Game, { GameState } from '../game';
import Space, { SpaceTypeEnum } from '../space';
import { BoardStatusEnum } from '../board';

describe('Game class', () => {
  describe('#updateBoardState', () => {
    let game = new Game();
    
    beforeEach(() => {
      game = new Game();
      jest.spyOn(game.board, 'getCurrentRoundPoints').mockReturnValue(2);
      jest.spyOn(game.board, 'flippedMultiplierSpaces').mockReturnValue([new Space(3), new Space(2), new Space(3)]);
    });

    it('sets the current round points', () => {
      expect(game.currentRoundPoints).toStrictEqual(0);
      game.updateBoardState();
      expect(game.currentRoundPoints).toStrictEqual(2);
    });

    it('sets the number of cards which have been flipped and are multipliers so far', () => {
      expect(game.flippedMultipliersCount).toStrictEqual(0);
      game.updateBoardState();
      expect(game.flippedMultipliersCount).toStrictEqual(3);
    });

    describe('with the board having a status of active', () => {
      beforeEach(() => {
        jest.spyOn(game.board, 'checkBoard').mockReturnValue(BoardStatusEnum.Active);
        game.updateBoardState();
      });

      it('keeps the game state the same to show that the round is still being played', () => {
        expect(game.state).toEqual(GameState.Playing);
      });
    });

    describe('with the board having a status of complete', () => {
      beforeEach(() => {
        jest.spyOn(game.board, 'checkBoard').mockReturnValue(BoardStatusEnum.Complete);
        game.updateBoardState();
      });

      it('changes the game state to show that the round is complete and moved to an intermission', () => {
        expect(game.state).toEqual(GameState.Intermission);
      });
    });

    describe('with the board having a status of lost', () => {
      beforeEach(() => {
        jest.spyOn(game.board, 'checkBoard').mockReturnValue(BoardStatusEnum.Lost);
        game.updateBoardState();
      });

      it('changes the game state to show that the round is lost', () => {
        expect(game.state).toEqual(GameState.RoundLost);
      });
    });
  });

  describe('#startRound', () => {
    let game = new Game();
    game.state = GameState.Intermission;

    it('sets the board up and sets up the games internal state', () => {
      jest.spyOn(game.board, 'buildSpaces');
      game.startRound();
      expect(game.board.buildSpaces).toBeCalled();
      expect(game.state).toEqual(GameState.Playing);
    });
  });

  describe('#nextRound', () => {
    let game = new Game();

    describe('with the games state being "lost"', () => {
      beforeEach(() => {
        game.state = GameState.RoundLost;
      });

      it('handles the loss, and begins the next round', () => {
        jest.spyOn(game, 'handleLostRound');
        jest.spyOn(game, 'startRound');
        game.nextRound();
        expect(game.handleLostRound).toBeCalled();
        expect(game.startRound).toBeCalled();
      });
    });

    describe('with the games state being in intermission', () => {
      beforeEach(() => {
        game.state = GameState.Intermission;
      });

      it('handles the loss, and begins the next round', () => {
        jest.spyOn(game, 'handleWonRound');
        jest.spyOn(game, 'startRound');
        game.nextRound();
        expect(game.handleWonRound).toBeCalled();
        expect(game.startRound).toBeCalled();
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
      game.flippedMultipliersCount = multipliersFlipped;
      game.handleLostRound();
      expect(game.board.difficulty).toBe(expectedDifficulty);
    });
  });

  describe('#handleWonRound', () => {
    let game = new Game();

    describe('and the difficulty is less than 8', () => {
      it('increments the difficulty by 1', () => {
        game.board.difficulty = 5;
        game.handleWonRound();
        expect(game.board.difficulty).toEqual(6);
      });
    });

    describe('and the difficulty of the board is currently at 8', () => {
      it('keeps the difficulty the same', () => {
        game.board.difficulty = 8;
        game.handleWonRound();
        expect(game.board.difficulty).toEqual(8);
      });
    });
  });

  describe('#resetGame', () => {
    let game = new Game();

    it('resets the game back to its original state, and starts the next round', () => {
      const originalSeed = game.seed;
      const originalRandom = game.random;
      game.board.difficulty = 5;
      game.currentRoundPoints = 120;
      game.totalPoints = 360;

      game.resetGame();

      expect(game.seed).not.toEqual(originalSeed);
      expect(game.random).not.toEqual(originalRandom);
      expect(game.board.difficulty).toEqual(1);
      expect(game.currentRoundPoints).toEqual(0);
      expect(game.totalPoints).toEqual(0);
    });
  });

  describe('#startIntermission', () => {
    let game = new Game();

    it('resets the game back to its original state, and starts the next round', () => {
      game.state = GameState.Playing;
      game.currentRoundPoints = 120;
      game.totalPoints = 360;

      game.startIntermission();

      expect(game.state).toEqual(GameState.Intermission);
      expect(game.currentRoundPoints).toEqual(0);
      expect(game.totalPoints).toEqual(480);
    });
  });
});