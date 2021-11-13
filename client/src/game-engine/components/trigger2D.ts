import { Transform2D, Model2D } from './index';

/**
 * Like  Collider2D, but doesn't check for collisions.
 */
export class Trigger2D {
  constructor (public transform: Transform2D, public model: Model2D, public behavior: (col: Trigger2D) => any) {}

	trigger (collided: Trigger2D) {
		this.behavior(collided);
	}
}