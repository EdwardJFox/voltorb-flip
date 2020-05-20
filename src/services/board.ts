import * as ShuffleSeed from 'shuffle-seed';

import Space, { SpaceTypeEnum, SpaceStateEnum } from './space';

export enum BoardStatusEnum {
  Active,
  Lost,
  Complete
}

class Board {
  difficulty: number;
  spaces: Space[][];
  width = 5;
  height = 5;

  constructor(difficulty: number) {
    this.difficulty = difficulty;
    this.spaces = [];
  }

  // Board builders

  public buildSpaces(random: any) {
    this.spaces = this.generateSpaces(random);
  }

  public generateSpaces(random: any): Space[][] {
    let toReturn = [];
    const elements = this.seededElements(random);

    for(var row = 0; row < this.height; row++) {
      toReturn.push([] as Space[]);
      for(var col = 0; col < this.width; col++) {
        toReturn[row][col] = elements[((row * this.width) + col)]
      }
    }
    return toReturn;
  }

  public seededElements(random: any): Space[] {
    let elements: Space[] = [
      ...this.buildMultipliers(random),
      ...this.buildVoltorbs(),
      ...this.buildOneSpaces()
    ];
    elements = ShuffleSeed.shuffle(elements, random().toString(36).substring(2));
    return elements;
  }

  private buildMultipliers(random: any): Space[] {
    return Array(this.numberOfMultipliers()).fill(0).map(() => {
      if(random() < 0.6) {
        return new Space(SpaceTypeEnum.Two);
      } else {
        return new Space(SpaceTypeEnum.Three);
      }
    })
  }

  private buildVoltorbs() {
    return Array(this.numberOfVoltorbs()).fill(0).map(() => new Space(SpaceTypeEnum.Voltorb));
  }

  private buildOneSpaces() {
    return Array(this.numberOfOneSpaces()).fill(0).map(() => new Space(SpaceTypeEnum.One));
  }

  // Mutator accessors

  public allSpaces(): Space[] {
    return this.spaces.flat();
  }

  public allMultiplierSpaces(): Space[] {
    return this.allSpaces().filter((space: Space) => space.isMultiplier());
  }

  public flippedSpaces(): Space[] {
    return this.allSpaces().filter((space: Space) => space.isFlipped())
  }

  public flippedMultiplierSpaces(): Space[] {
    return this.flippedSpaces().filter((space: Space) => space.isMultiplier());
  }

  public getCurrentRoundPoints(): number {
    return this.flippedMultiplierSpaces().reduce((total, space) => total * space.type, 1);
  }

  // Query methods

  public checkBoard(): BoardStatusEnum {
    if(this.isBoardLost()) {
      return BoardStatusEnum.Lost;
    } else if(this.isBoardComplete()) {
      return BoardStatusEnum.Complete;
    }

    return BoardStatusEnum.Active;
  }

  public isBoardLost(): boolean {
    return this.flippedSpaces().find((space) => space.type === SpaceTypeEnum.Voltorb) !== undefined;
  }

  public isBoardComplete(): boolean {
    const flippedSpaces = this.flippedMultiplierSpaces();
    return flippedSpaces.filter((space) => space.state === SpaceStateEnum.Flipped).length === this.allMultiplierSpaces().length
  }

  // Internal calculations
  
  private numberOfMultipliers = () => this.difficulty + 2;
  private numberOfVoltorbs = () => this.difficulty >= 5 ? 10 : (this.difficulty + 5);
  private totalNumberOfSpaces = () => this.width * this.height;
  private numberOfOneSpaces = () => this.totalNumberOfSpaces() - (this.numberOfMultipliers() + this.numberOfVoltorbs())
}

export default Board;