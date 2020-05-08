export enum SpaceTypeEnum {
  One,
  Two,
  Three,
  Voltorb
}

export enum SpaceStatusEnum {
  Hidden,
  Flipped
}

class Space {
  type: SpaceTypeEnum;
  state = SpaceStatusEnum.Hidden;

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
}

export default Space;