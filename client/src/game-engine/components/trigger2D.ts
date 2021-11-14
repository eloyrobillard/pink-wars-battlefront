import { Transform2D, Model2D } from './index';
import { Missile } from '../game-objects/missile';
import { Ship } from '../game-objects/ship';

/**
 * Like  Collider2D, but doesn't check for collisions.
 */
export class Trigger2D {
  constructor (public object: Ship | Missile, public transform: Transform2D, public model: Model2D) {}

	trigger (collided: Trigger2D) {
		this.object.onCollide(collided);
	}
}