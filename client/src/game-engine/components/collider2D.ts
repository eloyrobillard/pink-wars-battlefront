import { Vec2 } from '../types/index';
import { Trigger2D } from './index';
import GameApi from '../GameApi';
import DebugApi from '../../DebugApi';
import Game from '../gameLoop';
// import { Ship } from '../ship/ship';

const hits: Vec2[] = [];

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
		hits.forEach((hit) => {
			DebugApi.placeP5Call((p5) => {
				p5.point(hit.x, hit.y)
			});
		})
	}

	checkCollision = GameApi.setTimer(1, () => {
		Game.Pool.map((squadron) => {
			squadron.map((ship) => {
				const { trigger } = ship;
        if (this.checkOverlap(trigger)) {
					hits.push(new Vec2(this.transform.position.x, this.transform.position.y));
        }
				return ship;
			});

			return squadron;
		});
	});

	checkOverlap (other: Trigger2D) {
		return broadPhase(this, other) /* && narrowPhase(this, other) */;
	}
}

function broadPhase (missile: Trigger2D, other: Trigger2D): boolean {
	const { position } = missile.transform;
	const { vertices } = other.model;

	// LINK https://www.gamedev.net/forums/topic.asp?topic_id=295943
	// LINK (japanese) http://www.thothchildren.com/chapter/5b267a436298160664e80763
	return isPointInTri(position, vertices[0], vertices[1], vertices[2]);
}

// cross product
function sign(p1: Vec2, p2: Vec2, p3: Vec2): number { 
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y); 
}

function isPointInTri(pt: Vec2, v1: Vec2, v2: Vec2, v3: Vec2): boolean {
  const b1 = sign(pt, v1, v2) < 0;
	const b2 = sign(pt, v2, v3) < 0;
  const b3 = sign(pt, v3, v1) < 0;
  return ((b1 === b2) && (b2 === b3));
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