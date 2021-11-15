import { Missile } from '../game-objects/missile';
import { Trigger2D, Transform2D } from './index';
// import DebugApi from '../../DebugApi';
import { Vec2 } from '../types/index';
import GameApi from '../GameApi';
import Game from '../gameLoop';

/**
 * Like Trigger2D, but checks for a collision on every frame.
 */
export class Collider2D {
	constructor (public object: Missile, public transform: Transform2D) {}

	trigger (collided: Trigger2D) {
		this.object.onCollide(collided);
	}

	/**
   * Checks whether a collision happened.
   * If so, triggers behavior in parent.
   */
	update () {
		this.checkCollision();
	}

	checkCollision = GameApi.setTimer(2, () => {
		Game.Pool.map((battalion) => {
			battalion.mapShips((ship) => {
				const { trigger } = ship;
        if (this.checkOverlap(trigger)) {
					this.object.onCollide(trigger);
					ship.onCollide(this);
        }
				return ship;
			});

			return battalion;
		});
	});

	checkOverlap (other: Trigger2D) {
		const { position } = this.transform;
		const { vertices } = other.hitbox!;

		// LINK https://www.gamedev.net/forums/topic.asp?topic_id=295943
		// LINK (japanese) http://www.thothchildren.com/chapter/5b267a436298160664e80763
		// LINK for rectangles (japanese) https://blog.logicky.com/2011/09/06/blog-post_06/
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