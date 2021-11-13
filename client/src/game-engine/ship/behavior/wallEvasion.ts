import math from '../../../math/index';
import { vec2, Maybe, Some, None } from '../../types/index';
import { Ship } from '../ship';

const FRONT_DIST = 100; // px
const SIDES_DIST = 60; // px

type CastHit = {
	normal: vec2;
	angle: number;
	target: vec2;
};

function cast (front: vec2, rot: number, dist: number): Maybe<CastHit> {
	const deltaX = dist * math.cosConvert(rot);
	const deltaY = dist * math.sinConvert(rot);

	const { x, y } = front;

	const target = new vec2(
		x + deltaX, 
		y - deltaY
	);

	if (target.x < 0) {
		// found left wall
		return new Some({
			normal: new vec2(1, 0),
			angle: 0,
			target
		});
	} else if (target.x > window.innerWidth) {
		// found right wall
		return new Some({
			normal: new vec2(-1, 0),
			angle: 180,
			target
		});
	} else if (target.y < 0) {
		// found top wall
		return new Some({
			normal: new vec2(0, 1),
			angle: 270,
			target
		});
	} else if (target.y > window.innerHeight) {
		// found bottom wall
		return new Some({
			normal: new vec2(0, -1),
			angle: 90,
			target
		});
	}

	return new None();
}

export function detectWalls ({ transform }: Ship) {
	const { position } = transform;
	const rot = Math.floor(transform.rot);

	const maybeWall = cast(position, rot, FRONT_DIST);

	if (maybeWall.isNone) {
		return;
	}

	const castHit = maybeWall.unwrap()!;
	if (castHit.angle === 0 || castHit.angle === 180) {
		// left or right
		if (rot % 180 < 90) {
			// wants to turn left, so check if not wall on left
			const maybeLeft = cast(position, rot + 90, SIDES_DIST);
			return transform.lerpRot(maybeLeft.unwrapOrDef(castHit).angle, true);
			// deltaRot = maybeLeft.isSome ? -TURN_SPD : TURN_SPD;
		} else {
			// wants to turn right, so check if not wall on right
			const maybeRight = cast(position, rot - 90, SIDES_DIST);
			return transform.lerpRot(maybeRight.unwrapOrDef(castHit).angle, true);
		}
	} else {
		// top or bottom
		if (rot % 180 < 90) {
			// wants to turn right, so check if not wall on right
			const maybeRight = cast(position, rot - 90, SIDES_DIST);
			return transform.lerpRot(maybeRight.unwrapOrDef(castHit).angle, true);
		} else {
			// wants to turn left, so check if not wall on left
			const maybeLeft = cast(position, rot + 90, SIDES_DIST);
			return transform.lerpRot(maybeLeft.unwrapOrDef(castHit).angle, true);
		}
	}
}
