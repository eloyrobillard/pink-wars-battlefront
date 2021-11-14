import { Vec2 } from '../types/index';
import { Trigger2D } from './index';
import GameApi from '../GameApi';
// import DebugApi from '../../DebugApi';
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

	checkCollision = GameApi.setTimer(2, () => {
		Game.Pool.map((squadron) => {
			squadron.map((ship) => {
				const { trigger } = ship;
        if (this.checkOverlap(trigger)) {
					this.object.onCollide(trigger);
					ship.onCollide(this);
        }
				return ship;
			});

			return squadron;
		});
	});

	checkOverlap (other: Trigger2D) {
		const { position } = this.transform;
		const { vertices } = other.model;

		// LINK https://www.gamedev.net/forums/topic.asp?topic_id=295943
		// LINK (japanese) http://www.thothchildren.com/chapter/5b267a436298160664e80763
		return isPointInTri(position, vertices[0], vertices[1], vertices[2]);
	}
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