import { flock } from '../ship/behavior/flocking';
import { Ship } from '../ship/ship';

export class Anchor {
  constructor(public anchor: Ship) {}

  update(parent: Ship) {
    flock(parent);
  }
}