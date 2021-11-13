import { vec2 } from '../types/index';
import { Trigger2D } from './index';
import Game from '../gameLoop';
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

	checkCollision () {
    console.log('hi')
		Game.Pool.map((squadron) => {
			squadron.map((ship) => {
				const { trigger } = ship;
        if (this.checkOverlap(trigger)) {
          console.log('collision!');
        }
				return ship;
			});

			return squadron;
		});
	}

	checkOverlap (other: Trigger2D) {
		return broadPhase(this, other) /* && narrowPhase(this, other) */;
	}
}

function broadPhase (self: Trigger2D, other: Trigger2D): boolean {
	const { vertices: sVrts } = self.model;
	const { vertices: oVrts } = other.model;

  let sVecs = [];
  // NOTE self is line, single vector
  if (sVrts.length !== 2) {
    throw new Error('Collider2D, broad phase: I thought self should always be a line?!');
  }
  sVecs.push(vec2.toVec(sVrts[0].x, sVrts[0].y, sVrts[1].x, sVrts[1].y))

  let oVecs = [];
	for (let i = 0; i < oVrts.length; i++) {
    const curVert = sVrts[i];
		const nextVert = sVrts[i + 1 > sVrts.length ? 0 : i + 1];
    oVecs.push(vec2.toVec(curVert.x, curVert.y, nextVert.x, nextVert.y));
	}

  for (const vec1 of sVecs) {
    for (const vec2 of oVecs) {
      // LINK (japanese) http://www.marupeke296.com/COL_2D_No4_SquareToSquare.html
      if (vec1.crossProd(vec2) <= 0) {
        return true;
      }
    }
  }

  return false;
}

// function narrowPhase (self: Trigger2D, other: Trigger2D): boolean {}