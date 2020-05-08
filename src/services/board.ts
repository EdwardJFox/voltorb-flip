import seedrandom from 'seedrandom';
import * as ShuffleSeed from 'shuffle-seed';

import Space, { SpaceTypeEnum } from './space';

class Board {
  difficulty: number;
  seed: string;
  random: any;
  spaces: Space[][];
  width = 5;
  height = 5;

  constructor(difficulty: number, seed: string) {
    this.difficulty = difficulty;
    this.seed = seed;
    this.random = seedrandom(seed);
    this.spaces = [];
  }

  public buildSpaces() {
    this.spaces = this.generateSpaces();
  }

  public generateSpaces(): Space[][] {
    let toReturn = [];
    const elements = this.seededElements();

    for(var row = 0; row < this.height; row++) {
      toReturn.push([] as Space[]);
      for(var col = 0; col < this.width; col++) {
        toReturn[row][col] = elements[((row * this.width) + col)]
      }
    }
    return toReturn;
  }

  public seededElements(): Space[] {
    let elements: Space[] = [
      ...this.buildMultipliers(),
      ...this.buildVoltorbs(),
      ...this.buildOneSpaces()
    ]

    elements = ShuffleSeed.shuffle(elements, this.seed);
    return elements;
  }

  private buildMultipliers(): Space[] {
    return Array(this.numberOfMultipliers()).fill(0).map(() => {
      if(this.random() < 0.6) {
        return new Space(SpaceTypeEnum.Two);
      } else {
        return new Space(SpaceTypeEnum.Three);
      }
    })
  }

  private buildVoltorbs() {
    return Array(this.numberOfVoltorbs()).fill(0).map(() => {
      return new Space(SpaceTypeEnum.Voltorb);
    });
  }

  private buildOneSpaces() {
    return Array(this.numberOfOneSpaces()).fill(0).map(() => {
      return new Space(SpaceTypeEnum.One);
    });
  }
  
  private numberOfMultipliers = () => this.difficulty + 2;
  private numberOfVoltorbs = () => this.difficulty >= 5 ? 10 : (this.difficulty + 5);
  private totalNumberOfSpaces = () => this.width * this.height;
  private numberOfOneSpaces = () => this.totalNumberOfSpaces() - (this.numberOfMultipliers() + this.numberOfVoltorbs())
}

export default Board;