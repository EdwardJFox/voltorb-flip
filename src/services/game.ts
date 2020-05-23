import seedrandom from 'seedrandom';

import Board, { BoardStatusEnum } from "./board";

export enum GameStateEnum {
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
  state: GameStateEnum = GameStateEnum.Playing;
  flippedMultipliersCount: number = 0;

  constructor() {
    // Ensure that random is maintained between each board
    this.random = seedrandom(this.seed);
    this.board = new Board(1);
    this.board.buildSpaces(this.random);
  }

  /**
   * Method to reliably calculate the current state of the board.
   * It currently changes game state as well.
   */
  public updateBoardState(): GameStateEnum {
    this.currentRoundPoints = this.board.getCurrentRoundPoints();
    this.flippedMultipliersCount = this.board.flippedMultiplierSpaces().length;

    switch(this.board.checkBoard()) {
      case BoardStatusEnum.Active:
        this.state = GameStateEnum.Playing;
        break;
      case BoardStatusEnum.Complete:
        this.startIntermission();
        break;
      case BoardStatusEnum.Lost:
        this.state = GameStateEnum.RoundLost;
        break;
    }

    return this.state;
  }

  public startRound(): void {
    this.board.buildSpaces(this.random);
    this.state = GameStateEnum.Playing;
  }

  public nextRound(): void {
    if(this.state === GameStateEnum.RoundLost) {
      this.handleLostRound();
    } else {
      this.handleWonRound();
    }
    this.startRound();
  }

  public handleLostRound(): void {
    if(this.flippedMultipliersCount === 0) {
      this.board.difficulty = 1;
    } else if(this.flippedMultipliersCount <= this.board.difficulty) {
      this.board.difficulty = this.flippedMultipliersCount;
    } 
    this.currentRoundPoints = 0;
  }

  public handleWonRound(): void {
    if(this.board.difficulty < 8) {
      this.board.difficulty += 1;
    }
  }

  public resetGame(): void {
    this.seed = this.randomSeed();
    this.random = seedrandom(this.seed);
    this.board.difficulty = 1;
    this.currentRoundPoints = 0;
    this.totalPoints = 0;
  }

  public startIntermission(): void {
    this.state = GameStateEnum.Intermission;
    this.totalPoints += this.currentRoundPoints;
    this.currentRoundPoints = 0;
  }

  private randomSeed(): string {
    return Math.random().toString(36).substring(2);
  }
}

export default Game;