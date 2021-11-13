import { Trigger2D } from './index';
// import { vec2 } from '../types/index';
// import { Ship } from '../ship/ship';

/**
 * Like Trigger2D, but checks for a collision on every frame.
 */
export class Collider2D extends Trigger2D {
	/**
   * Checks whether a collision happened.
   * If so, triggers behavior in parent.
   */
	update () {
    this.checkCollision();
  }

  checkCollision() {

  }
}
