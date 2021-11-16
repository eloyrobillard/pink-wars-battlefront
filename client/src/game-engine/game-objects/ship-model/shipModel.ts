import { Vec2 } from '../../types/index';

export default interface ShipModel {
  missileOffsets: Vec2[];
  hitboxOffsets: Vec2[];
  model: Vec2[];
  speedMultiplier: number;
  rotSpeedMultiplier: number;
}