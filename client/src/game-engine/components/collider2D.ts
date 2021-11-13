import { Ship } from '../ship/ship';
import { vec2 } from '../types/index';

export class Collider2D {
  dot: vec2;

  constructor(dot: vec2, public behavior: (col: Ship) => any) {
    this.dot = dot;
  }

  trigger(collided: Ship) {
    this.behavior(collided);
  }

  /**
   * Checks whether a collision happened.
   * If so, triggers behavior in parent.
   */
  update() {

  }
}