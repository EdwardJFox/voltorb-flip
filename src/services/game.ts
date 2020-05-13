import seedrandom from 'seedrandom';

import Board from "./board";
import Space, { SpaceStatusEnum, SpaceTypeEnum } from './space';

export enum GameState {
  Playing,
  RoundFailed,
  Intermission
}

class Game {
  board!: Board;
  seed: string = this.randomSeed();
  difficulty: number = 1;
  random: any;
  currentRoundPoints: number = 0;
  totalPoints: number = 0;
  state: GameState = GameState.Playing;

  public setup() {
    // Ensure that random is maintained between each board as well, from the beginning of the game
    this.random = seedrandom(this.seed);
    this.board = new Board(this.difficulty);
  }

  /**
   * Return true for a change in state
   */
  public checkBoard(): Boolean {
    const allSpaces = this.board.spaces.reduce((spaces: Space[], row) => [...spaces, ...row]);
    const allFlippedSpaces = allSpaces.filter((space) => space.state === SpaceStatusEnum.Flipped);
    const allHigherMultipliers = allSpaces.filter((space) => space.type > 1);
    const allFlippedMultipliers = allFlippedSpaces.filter((space) => space.type > 0);

    this.currentRoundPoints = allFlippedMultipliers.reduce((total, space) => total * space.type, 1);
    if(allFlippedSpaces.find((space) => space.type === SpaceTypeEnum.Voltorb)) {
      this.state = GameState.RoundFailed;
      return true;
    } else if(allHigherMultipliers.filter((space) => space.state === SpaceStatusEnum.Flipped).length === allHigherMultipliers.length) {
      this.startIntermission();
      return true;
    }

    return false;
  }

  public startRound(): Space[][] {
    this.board.buildSpaces(this.random);
    return this.board.spaces;
  }

  public nextRound(): Space[][] {
    if(this.state === GameState.RoundFailed) {
      this.difficulty = 1;
      this.board.difficulty = this.difficulty;
      this.currentRoundPoints = 0;
    } else {
      if(this.difficulty < 8) {
        this.difficulty += 1;
        this.board.difficulty = this.difficulty;
      }
    }
    this.state = GameState.Playing;
    return this.startRound();
  }

  public resetGame(): Space[][] {
    this.seed = this.randomSeed();
    this.random = seedrandom(this.seed);
    this.difficulty = 1;
    this.board.difficulty = this.difficulty;
    this.currentRoundPoints = 0;
    this.totalPoints = 0;
    this.state = GameState.Playing;
    return this.startRound();
  }

  public startIntermission() {
    this.state = GameState.Intermission;
    this.totalPoints += this.currentRoundPoints;
    this.currentRoundPoints = 0;
  }

  private randomSeed(): string {
    return Math.random().toString(36).substring(2);
  }
}

export default Game;