import { Vec2 } from '../types/index';
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

function broadPhase (missile: Trigger2D, other: Trigger2D): boolean {
	const { position } = missile.transform;
	const { vertices } = other.model;

  const vecP0 = Vec2.toVec(vertices[0].x, vertices[0].y, position.x, position.y);
  const vecP1 = Vec2.toVec(vertices[1].x, vertices[1].y, position.x, position.y);
	const vecP2 = Vec2.toVec(vertices[2].x, vertices[2].y, position.x, position.y);

	const vec0 = Vec2.toVec(vertices[1].y, vertices[0].x, vertices[0].y, vertices[1].x);
	const vec1 = Vec2.toVec(vertices[2].y, vertices[1].x, vertices[1].y, vertices[2].x);
	const vec2 = Vec2.toVec(vertices[2].y, vertices[0].x, vertices[0].y, vertices[2].x);
	
	// LINK https://www.gamedev.net/forums/topic.asp?topic_id=295943
	const b0 = vecP0.crossProd(vec0) > 0;
	const b1 = vecP1.crossProd(vec1) > 0;
	const b2 = vecP2.crossProd(vec2) > 0;

	return b0 === b1 && b1 === b2;
}

// function checkPointInTriangle() {

// }

// function broadPhase (missile: Trigger2D, other: Trigger2D): boolean {
// 	const { vertices: sVrts } = missile.model;
// 	const { vertices: vertices } = other.model;

//   let sVecs = [];
//   // NOTE missile is line, single vector
//   if (sVrts.length !== 2) {
//     throw new Error('Collider2D, broad phase: I thought missile should always be a line?!');
//   }
//   sVecs.push(Vec2.toVec(sVrts[0].x, sVrts[0].y, sVrts[1].x, sVrts[1].y))

//   let oVecs = [];
// 	for (let i = 0; i < vertices.length; i++) {
//     const curVert = vertices[i];
// 		const nextVert = vertices[i + 1 === vertices.length ? 0 : i + 1];
//     oVecs.push(Vec2.toVec(curVert.x, curVert.y, nextVert.x, nextVert.y));
// 	}

//   for (const vec1 of sVecs) {
//     for (const Vec2 of oVecs) {
//       // LINK (japanese) http://www.marupeke296.com/COL_2D_No4_SquareToSquare.html
//       if (vec1.crossProd(Vec2) <= 0) {
//         return true;
//       }
//     }
//   }

//   return false;
// }

// function narrowPhase (missile: Trigger2D, other: Trigger2D): boolean {}