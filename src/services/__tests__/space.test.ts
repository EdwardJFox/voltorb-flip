import Space, { SpaceTypeEnum, SpaceStateEnum, SpaceMarkersEnum } from '../space';

describe('Board class', () => {
  describe('#flip', () => {
    describe('if the space is not yet flipped', () => {
      let space: Space;

      beforeEach(() => {
        space = new Space(SpaceTypeEnum.One);
      });

      it('sets the state of the space to flipped', () => {
        expect(space.state).toEqual(SpaceStateEnum.Hidden);
        space.flip();
        expect(space.state).toEqual(SpaceStateEnum.Flipped);
      });
    });

    describe('if the space has been flipped', () => {
      let space: Space;

      beforeEach(() => {
        space = new Space(SpaceTypeEnum.One);
        space.state = SpaceStateEnum.Flipped;
      });

      it('sets the state of the space to flipped', () => {
        expect(space.state).toEqual(SpaceStateEnum.Flipped);
        space.flip();
        expect(space.state).toEqual(SpaceStateEnum.Flipped);
      });
    });
  });

  describe('#mark', () => {
    let space: Space;

    beforeEach(() => {
      space = new Space(SpaceTypeEnum.One);
    });

    describe('with no markings on the space', () => {
      it('adds the marking to the array of markers on the space', () => {
        space.mark(SpaceMarkersEnum.One);
        expect(space.markers).toEqual([SpaceMarkersEnum.One]);
      });
    });

    describe('with a marking of a different type on the space', () => {
      beforeEach(() => {
        space.markers = [SpaceMarkersEnum.Voltorb];
      });

      it('adds the marking to the array of markers on the space', () => {
        space.mark(SpaceMarkersEnum.One);
        expect(space.markers).toEqual([SpaceMarkersEnum.Voltorb, SpaceMarkersEnum.One]);
      });
    });

    describe('with a marking of the same type on the space', () => {
      beforeEach(() => {
        space.markers = [SpaceMarkersEnum.Voltorb];
      });

      it('adds the marking to the array of markers on the space', () => {
        space.mark(SpaceMarkersEnum.Voltorb);
        expect(space.markers).toEqual([]);
      });
    });
  });

  describe('#isFlipped', () => {
    it('returns true if the space status is set to flipped', () => {
      const space = new Space(SpaceTypeEnum.One);
      space.state = SpaceStateEnum.Flipped;
      expect(space.isFlipped()).toBeTruthy();
    });

    it('returns true if the space status is set to hidden', () => {
      const space = new Space(SpaceTypeEnum.One);
      space.state = SpaceStateEnum.Hidden;
      expect(space.isFlipped()).toBeFalsy();
    });
  });

  describe('#isMultiplier', () => {
    it('returns false if the space is a voltorb', () => {
      const space = new Space(SpaceTypeEnum.Voltorb);
      expect(space.isMultiplier()).toBeFalsy();
    });
    
    it('returns false if the space is a one', () => {
      const space = new Space(SpaceTypeEnum.One);
      expect(space.isMultiplier()).toBeFalsy();
    });
    
    it('returns false if the space is a two', () => {
      const space = new Space(SpaceTypeEnum.Two);
      expect(space.isMultiplier()).toBeTruthy();
    });
    
    it('returns false if the space is a three', () => {
      const space = new Space(SpaceTypeEnum.Three);
      expect(space.isMultiplier()).toBeTruthy();
    });
  });
});