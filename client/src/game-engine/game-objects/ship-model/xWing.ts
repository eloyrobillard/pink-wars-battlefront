import { Vec2 } from '../../types/index';
import ShipModel from './shipModel';

export const xWing: ShipModel = {
	missileOffsets: [
		new Vec2(0, -5.625),
		new Vec2(0, 5.625)
	],
	hitboxOffsets: [
		new Vec2(-25, -8),
		new Vec2(10, 0),
		new Vec2(-25, 8)
	],
	model: [
		new Vec2(0, 1 / 4),
		new Vec2(-8.5, 1),
		new Vec2(-8.5, 2.5),
		new Vec2(-9, 2.5),
		new Vec2(-9, 5.5),
		new Vec2(-9 + 5, 5.5 + 0.125),
		new Vec2(-9, 5.5 + 0.25),
		new Vec2(-11, 5.5 + 0.25),
		new Vec2(-11, 5.5),
		new Vec2(-10.5, 5.5),
		new Vec2(-11.5, 2.5),
		new Vec2(-11.5 + 1 / 4, 2.5),
		new Vec2(-11.5 + 1 / 8, 2.5 - 1 / 3),
		new Vec2(-11.5 + 1 / 8 - 2.5, 2.5 - 1 / 3),
		new Vec2(-11.5 + 1 / 8 - 2.5, 2.5 - 1 / 3 - 3 / 4),
		new Vec2(-11.5 + 1 / 8, 2.5 - 1 / 3 - 3 / 4),
		new Vec2(-11.5, 1),
		new Vec2(-8.5 - 1.5 - 2, 1 - 1 / 4),
		new Vec2(-8.5 - 1.5 - 2, -1 + 1 / 4),
		new Vec2(-11.5, -1),
		new Vec2(-11.5 + 1 / 8, - 2.5 + 1 / 3 + 3 / 4),
		new Vec2(-11.5 + 1 / 8 - 2.5, - 2.5 + 1 / 3 + 3 / 4),
		new Vec2(-11.5 + 1 / 8 - 2.5, - 2.5 + 1 / 3),
		new Vec2(-11.5 + 1 / 8, - 2.5 + 1 / 3),
		new Vec2(-11.5 + 1 / 4, - 2.5),
		new Vec2(-11.5, - 2.5),
		new Vec2(-10.5, -5.5 + 0.125),
		new Vec2(-11, -5.5 + 0.125),
		new Vec2(-11, -5.5 - 0.25),
		new Vec2(-11 + 2, -5.5 - 0.25),
		new Vec2(-9 + 5, -5.5 - 0.125),
		new Vec2(-9, -5.5),
		new Vec2(-9, - 2.5),
		new Vec2(-8.5, - 2.5),
		new Vec2(-8.5, -1),
		new Vec2(0, -1 / 4)
	]
}