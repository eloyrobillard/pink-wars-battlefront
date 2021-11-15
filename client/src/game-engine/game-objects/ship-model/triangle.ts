import { Vec2 } from '../../types/index';
import ShipModel from './shipModel';


export const triangle: ShipModel = {
  missileOffsets: [
    new Vec2(0, 0),
  ],
  hitboxOffsets: [
    new Vec2(-15, -4),
    new Vec2(0, 0),
    new Vec2(-15, 4)
  ],
  model: [
    new Vec2(-15, -4),
    new Vec2(0, 0),
    new Vec2(-15, 4)
  ]
}
