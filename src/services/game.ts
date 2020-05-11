import seedrandom from 'seedrandom';

import Board from "./board";
import Space from './space';

export enum GameState {
  Playing,
  GameOver
}

class Game {
  board!: Board;
  seed: string = Math.random().toString(36).substring(2);
  difficulty: number = 1;
  random: any;
  points: number = 0;
  totalPoints: number = 0;
  state: GameState = GameState.Playing;

  constructor() {
  }

  public setup() {
    // Ensure that random is maintained between each board as well, from the beginning of the game
    this.random = seedrandom(this.seed);
    this.board = new Board(this.difficulty);
  }

  public checkBoard() {
    const allSpaces = this.board.spaces.reduce((spaces: Space[], row) => [...spaces, ...row]);
    
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
    this.random = seedrandom(this.seed);
    this.difficulty = 1;
    this.board = new Board(this.difficulty);
    this.state = GameState.Playing;
    return this.startRound();
  }
}

export default Game;