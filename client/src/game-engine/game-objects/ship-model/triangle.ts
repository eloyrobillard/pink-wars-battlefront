import { Vec2 } from '../../types/index';
import ShipModel from './shipModel';


export const triangle: ShipModel = {
  speedMultiplier: 1,
  rotSpeedMultiplier: 1,
  missileOffsets: [
    new Vec2(0, 0),
  ],
  hitboxOffsets: [
    new Vec2(-15, -8),
    new Vec2(10, 0),
    new Vec2(-15, 8)
  ],
  model: [
    new Vec2(-15, -4),
    new Vec2(0, 0),
    new Vec2(-15, 4)
  ]
}
