import { Transform2D, Model2D } from './index';
// import { vec2 } from '../types/index';
import { Ship } from '../ship/ship';

/**
 * Like  Collider2D, but doesn't check for collisions.
 */
export class Trigger2D {
  constructor (public transform: Transform2D, public model: Model2D, public behavior: (col: Ship) => any) {}

	trigger (collided: Ship) {
		this.behavior(collided);
	}
}