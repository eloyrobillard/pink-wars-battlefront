import { Transform2D, HitBox2D, Collider2D } from './index';
// import { Missile } from '../game-objects/missile';
import { Ship } from '../game-objects/ship';

/**
 * Like  Collider2D, but doesn't check for collisions.
 */
export class Trigger2D {
  constructor (public object: Ship, public transform: Transform2D, public hitbox: HitBox2D) {}

	trigger (collided: Collider2D) {
		this.object.onCollide(collided);
	}
}