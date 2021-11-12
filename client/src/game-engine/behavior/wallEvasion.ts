import math from '../../math/index';
import { vec2, Maybe, Some, None, Ship } from '../types/index';

const FRONT_DIST = 100; // px
const SIDES_DIST = 20; // px
const TURN_SPD = 150;

type CastHit = {
	normal: vec2;
	angle: number;
	target: vec2;
};

function cast (front: vec2, rot: number, dist: number): Maybe<CastHit> {
	const deltaX = dist * math.cosConvert(rot);
	const deltaY = dist * math.sinConvert(rot);

	const { x, y } = front;
	// direction x/y used for negative directions
	const target = new vec2(x + deltaX, y - deltaY);
	// console.log(deltaX, deltaY);

	if (target.x < 0) {
		// found left wall
		// console.log('found left', Math.floor(castPoint.x), Math.floor(front.x), rot);
		return new Some({
			normal: new vec2(1, 0),
			angle: 0,
			target
		});
	} else if (target.x > window.innerWidth) {
		// found right wall
		// console.log('found right', Math.floor(castPoint.x), Math.floor(front.x), rot);
		return new Some({
			normal: new vec2(-1, 0),
			angle: 180,
			target
		});
	} else if (target.y < 0) {
		// found top wall
		// console.log('found top', Math.floor(castPoint.y), Math.floor(front.y), rot);
		return new Some({
			normal: new vec2(0, 1),
			angle: 270,
			target
		});
	} else if (target.y > window.innerHeight) {
		// found bottom wall
		// console.log('found bottom', Math.floor(castPoint.y), Math.floor(front.y), rot);
		return new Some({
			normal: new vec2(0, -1),
			angle: 90,
			target
		});
	}

	return new None();
}

export function detectWalls (ship: Ship) {
	let deltaRot = 0;

	const { position } = ship.transform;
	const rot = Math.floor(ship.transform.rot);
	// console.log(rot);

	const maybeWall = cast(position, rot, FRONT_DIST);

	// TODO consider checking side walls anyway
	if (maybeWall.isNone) {
		ship.wallEvadeRot = 0;
		return;
	}

	const { angle } = maybeWall.unwrap()!;
	if (angle === 0 || angle === 180) {
		// left or right
		// console.log('left or right');
		if (rot % 180 < 90) {
			// wants to turn left, so check if not wall on left
			const maybeLeft = cast(position, rot + 90, SIDES_DIST);
			deltaRot = maybeLeft.isSome ? -TURN_SPD : TURN_SPD;
		} else {
			// wants to turn right, so check if not wall on right
			const maybeRight = cast(position, rot - 90, SIDES_DIST);
			deltaRot = maybeRight.isSome ? TURN_SPD : -TURN_SPD;
		}
	} else {
		// top or bottom
		// console.log('top or bottom');
		if (rot % 180 < 90) {
			// wants to turn right, so check if not wall on right
			const maybeRight = cast(position, rot - 90, SIDES_DIST);
			deltaRot = maybeRight.isSome ? TURN_SPD : -TURN_SPD;
		} else {
			// wants to turn left, so check if not wall on left
			const maybeLeft = cast(position, rot + 90, SIDES_DIST);
			deltaRot = maybeLeft.isSome ? -TURN_SPD : TURN_SPD;
		}
	}

	// console.log(deltaRot > 0 ? 'go left' : 'go right');
	return ship.addRot(deltaRot);
}
