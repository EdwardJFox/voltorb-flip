import seedrandom from 'seedrandom';

import Board from "./board";
import Space, { SpaceStatusEnum, SpaceTypeEnum } from './space';

export enum GameState {
  Playing,
  RoundLost,
  Intermission
}

class Game {
  board!: Board;
  seed: string = this.randomSeed();
  random: any;
  currentRoundPoints: number = 0;
  totalPoints: number = 0;
  state: GameState = GameState.Playing;
  flippedMultipliers: number = 0;

  constructor() {
    // Ensure that random is maintained between each board as well, from the beginning of the game
    this.random = seedrandom(this.seed);
    this.board = new Board(1);
    this.board.buildSpaces(this.random);
  }

  /**
   * Return true for a change in state
   */
  public checkBoard(): GameState {
    const allSpaces = this.board.allSpaces();
    const allFlippedSpaces = allSpaces.filter((space) => space.state === SpaceStatusEnum.Flipped);
    const allHigherMultipliers = allSpaces.filter((space) => space.type > 1);
    const allFlippedMultipliers = allFlippedSpaces.filter((space) => space.type > 0);

    this.currentRoundPoints = allFlippedMultipliers.reduce((total, space) => total * space.type, 1);
    if(allFlippedSpaces.find((space) => space.type === SpaceTypeEnum.Voltorb)) {
      this.state = GameState.RoundLost;
      this.flippedMultipliers = this.board.flippedMultiplierSpaces().length;
    } else if(allHigherMultipliers.filter((space) => space.state === SpaceStatusEnum.Flipped).length === allHigherMultipliers.length) {
      this.startIntermission();
    }

    return this.state;
  }

  public startRound(): Space[][] {
    this.board.buildSpaces(this.random);
    this.state = GameState.Playing;
    return this.board.spaces;
  }

  public nextRound(): Space[][] {
    if(this.state === GameState.RoundLost) {
      this.handleLostRound();
    } else {
      this.handleWonRound();
    }
    return this.startRound();
  }

  public handleLostRound(): void {
    if(this.flippedMultipliers === 0) {
      this.board.difficulty = 1;
    } else if(this.flippedMultipliers <= this.board.difficulty) {
      this.board.difficulty = this.flippedMultipliers;
    } 
    this.currentRoundPoints = 0;
  }

  public handleWonRound(): void {
    if(this.board.difficulty < 8) {
      this.board.difficulty += 1;
    }
  }

  public resetGame(): Space[][] {
    this.seed = this.randomSeed();
    this.random = seedrandom(this.seed);
    this.board.difficulty = 1;
    this.currentRoundPoints = 0;
    this.totalPoints = 0;
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