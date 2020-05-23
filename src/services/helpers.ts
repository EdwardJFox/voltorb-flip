import Space, { SpaceTypeEnum } from './space';

export function totalOfMultipliers(spaces: Space[]): number {
  return spaces.reduce((total, space) => space.type !== SpaceTypeEnum.Voltorb ? total + space.type : total, 0)
}

export function countOfVoltorbs(spaces: Space[]): number {
  return spaces.reduce((total, space) => space.type === SpaceTypeEnum.Voltorb ? total + 1 : total, 0)
}

export function getColumnFromBoard(column: number, spaces: Space[][]): Space[] {
  return spaces.map(row => row[column]);
}