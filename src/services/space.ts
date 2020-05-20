export enum SpaceTypeEnum {
  Voltorb,
  One,
  Two,
  Three
}

export enum SpaceStateEnum {
  Hidden,
  Flipped
}

export enum SpaceMarkersEnum {
  Voltorb,
  One,
  Two,
  Three
}

class Space {
  type: SpaceTypeEnum;
  state = SpaceStateEnum.Hidden;
  markers: SpaceMarkersEnum[] = [];

  constructor(type: SpaceTypeEnum) {
    this.type = type;
  }

  public flip(): void {
    this.state = SpaceStateEnum.Flipped;
  }

  public mark(marking: SpaceMarkersEnum): void {
    if(this.markers.includes(marking)) {
      this.markers.splice(this.markers.indexOf(marking), 1);
    } else {
      this.markers.push(marking);
    }
  }

  public isFlipped(): boolean {
    return this.state === SpaceStateEnum.Flipped;
  }

  public isMultiplier(): boolean {
    return this.type >= SpaceMarkersEnum.Two;
  }
}

export default Space;