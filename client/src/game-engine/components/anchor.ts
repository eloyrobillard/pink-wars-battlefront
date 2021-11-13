import { flock } from '../game-objects/behavior/flocking';
import { Ship } from '../game-objects/ship';

export class Anchor {
  constructor(public anchor: Ship) {}

  update(parent: Ship) {
    flock(parent, this.anchor);
  }
}