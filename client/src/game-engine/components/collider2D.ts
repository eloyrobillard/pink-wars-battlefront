import { Transform2D } from './index';
// import { vec2 } from '../types/index';
import { Ship } from '../ship/ship';

export class Collider2D {
	constructor (public transform: Transform2D, public behavior: (col: Ship) => any) {}

	trigger (collided: Ship) {
		this.behavior(collided);
	}

	/**
   * Checks whether a collision happened.
   * If so, triggers behavior in parent.
   */
	update () {}
}
