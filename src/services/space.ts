export enum SpaceTypeEnum {
  Voltorb,
  One,
  Two,
  Three
}

export enum SpaceStatusEnum {
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
  state = SpaceStatusEnum.Hidden;
  markers: SpaceMarkersEnum[] = [];

  constructor(type: SpaceTypeEnum) {
    this.type = type;
  }

  public flip(): Boolean {
    this.state = SpaceStatusEnum.Flipped;
    if(this.type === SpaceTypeEnum.Voltorb) {
      return false;
    } else {
      return true;
    }
  }

  public mark(marking: SpaceMarkersEnum): void {
    if(this.markers.includes(marking)) {
      this.markers.splice(this.markers.indexOf(marking), 1);
    } else {
      this.markers.push(marking);
    }
  }

  public isFlipped(): boolean {
    return this.state === SpaceStatusEnum.Flipped;
  }

  public isMultiplier(): boolean {
    return this.type >= SpaceMarkersEnum.Two;
  }
}

export default Space;