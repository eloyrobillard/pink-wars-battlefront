import { Vec2 } from '../../types/index';
import ShipModel from './shipModel';

const SCALE = 1;

export const tieFighter: ShipModel = {
  speedMultiplier: 1.25,
	rotSpeedMultiplier: 1.5,
	missileOffsets: [
		new Vec2(0, -3).scalarMul(SCALE),
		new Vec2(0, 3).scalarMul(SCALE),
	],
	hitboxOffsets: [
		new Vec2(-25, -8),
		new Vec2(10, 0),
		new Vec2(-25, 8),
	],
  model: [
    new Vec2(-1, 5.555 - 1/4),
    new Vec2(-1.25, 5.555),
    new Vec2(-7.5 - 6, 5.555),
    new Vec2(-7.5 - 6.25, 5.555 - 1/4),
    new Vec2(-7.5 - 6, 5.555 - 1/2),
    new Vec2(-7.5 - 1.25, 5.555 - 1/2),
    new Vec2(-7.5 - 0.9, 5.555 / 2),
    new Vec2(-7.5 - 1.2, 5.555 / 2 - 1.25),
    new Vec2(-7.5 - 2, 5.555 / 2 - 1.75),
    new Vec2(-7.5 - 2.5, 5.555 / 2 - 3.25),
    new Vec2(-7.5 - 2, 5.555 / 2 - 4.5),
    new Vec2(-7.5 - 1.35, 5.555 / 2 - 5),
    new Vec2(-7.5 - 0.9, 5.555 / 2 - 6.5),
    new Vec2(-7.5 - 1, -5.555 / 2 - 3.5),
    new Vec2(-7.5 - 6, -5.555 / 2 - 3.5),
    new Vec2(-7.5 - 6.25, -5.555 / 2 - 3.75),
    new Vec2(-7.5 - 6, -5.555 / 2 - 4),
    new Vec2(-1.25, -5.555 / 2 - 4),
    new Vec2(-1, -5.555 / 2 - 3.75),
    new Vec2(-1.25, -5.555 / 2 - 3.5),
    new Vec2(-7.5 + 0.75, -5.555 / 2 - 3.5),
    new Vec2(-7.5 + 0.5, -5.555 / 2 - 2.25),
    new Vec2(-7.5 + 1.1, 5.555 / 2 - 4.5),
    new Vec2(-7.5 + 1.75, 5.555 / 2 - 4),
    new Vec2(-7.5 + 1.75, 5.555 / 2 - 2.25),
    new Vec2(-7.5 + 1.25, 5.555 / 2 - 1.75),
    new Vec2(-7.5 + 0.65, 5.555 - 1.5),
    new Vec2(-7.5 + 0.9, 5.555 - 1/2),
    new Vec2(-1.25, 5.555 - 1/2),
  ]
}

