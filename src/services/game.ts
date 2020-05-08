import seedrandom from 'seedrandom';

import Board from "./board";
import Space from './space';

export enum GameState {
  Playing,
  GameOver
}

class Game {
  board!: Board;
  _seed: string = Math.random().toString(36).substring(2);
  _difficulty: number = 1;
  random: any;
  points: number = 0;
  state: GameState = GameState.Playing;

  constructor() {
  }

  setup() {
    // Ensure that random is maintained between each board as well, from the beginning of the game
    this.random = seedrandom(this.seed);
    this.board = new Board(this._difficulty);
  }

  public set seed(seed : string) {
    this._seed = seed;
    this.resetGame();
  }

  public get seed() : string {
    return this._seed
  }

  public set difficulty(difficulty : number) {
    this._difficulty = difficulty;
    this.resetGame();
  }

  public get difficulty() : number {
    return this._difficulty
  }

  public startRound(): Space[][] {
    this.board.buildSpaces(this.random);
    return this.board.spaces;
  }

  public nextRound(): Space[][] {
    if(this.difficulty < 8) {
      this.difficulty += 1;
      this.board.difficulty = this.difficulty;
    }
    return this.startRound();
  }

  public resetGame(): Space[][] {
    this.random = seedrandom(this._seed);
    this._difficulty = 1;
    this.board = new Board(this._difficulty);
    this.state = GameState.Playing;
    return this.startRound();
  }
}

export default Game;