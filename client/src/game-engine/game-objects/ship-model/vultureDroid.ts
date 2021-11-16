import ShipModel from './shipModel';
import { Vec2 } from '../../types/index';

const SCALE = 1;

export const vultureDroid: ShipModel = {
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
		new Vec2(0, 5.555),
		new Vec2(0, 5.555 + 1 / 8),
		new Vec2(-7.5 + 3, 5.555 + 1 / 2),
		new Vec2(-7.5 - 2, 5.555 + 1 / 2),
		new Vec2(-7.5 - 6, 5.555 + 1 / 8),
		new Vec2(-7.5 - 6, 5.555),
		new Vec2(-7.5 - 6, 5.555 - 1/8),
		new Vec2(-7.5 - 2.5, 5.555 - 1/2),
		new Vec2(-7.5 - 3.5, 3.555),
		new Vec2(-7.5 - 5, 3.555 - 1/2),
		new Vec2(-7.5 - 5.5, 3.555 - 1),
		new Vec2(-7.5 - 5.75, 3.555 - 1.5),
		new Vec2(-7.5 - 5.75, 3.555 - 2),
		new Vec2(-7.5 - 5.5, 3.555 - 2.5),
		new Vec2(-7.5 - 5, 3.555 - 3),
		new Vec2(-7.5 - 3.5, 3.555 - 3.5),
		new Vec2(-7.5 - 2.5, -1.444),
		new Vec2(-7.5 - 6, -1.444 - 1/4),
		new Vec2(-7.5 - 6, -1.444 - 1/2),
		new Vec2(-7.5 - 2, -1.444 - 1),
		new Vec2(-7.5 + 3, -1.444 - 1),
		new Vec2(0, -1.444 - 1 + 1 / 2),
		new Vec2(0, -1.444 - 1 / 4),
		new Vec2(-7.5 + 3, -1.444),
		new Vec2(-7.5, -1.444),
		new Vec2(-7.5 + 0.66, -1.444 + 0.66),
		new Vec2(-7.5 + 1.5, 3.555 - 2.5),
		new Vec2(-7.5 + 1.5, 3.555 - 1),
		new Vec2(-7.5 + 0.66, 3.555 - 1 + 11/6),
		new Vec2(-7.5 + 0.66, 5.555 - 1/2),
		new Vec2(-7.5 + 3, 5.555 - 1/2),
		new Vec2(0, 5.555 - 1/8),
	]
}

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  