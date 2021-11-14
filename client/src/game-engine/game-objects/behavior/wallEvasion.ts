import math from '../../../math/index';
import { Vec2, Maybe, Some, None } from '../../types/index';
import { Ship } from '../ship';

const FRONT_DIST = 100; // px
const SIDES_DIST = 100; // px

type CastHit = {
	normal: Vec2;
	angle: number;
	target: Vec2;
};

function cast (front: Vec2, rot: number, dist: number): Maybe<CastHit> {
	const deltaX = dist * math.cosConvert(rot);
	const deltaY = dist * math.sinConvert(rot);

	const { x, y } = front;

	const target = new Vec2(
		x + deltaX, 
		y - deltaY
	);

	if (target.x < 0) {
		// found left wall
		return new Some({
			normal: new Vec2(1, 0),
			angle: 0,
			target
		});
	} else if (target.x > window.innerWidth) {
		// found right wall
		return new Some({
			normal: new Vec2(-1, 0),
			angle: 180,
			target
		});
	} else if (target.y < 0) {
		// found top wall
		return new Some({
			normal: new Vec2(0, 1),
			angle: 270,
			target
		});
	} else if (target.y > window.innerHeight) {
		// found bottom wall
		return new Some({
			normal: new Vec2(0, -1),
			angle: 90,
			target
		});
	}

	return new None();
}

export function detectWalls ({ transform }: Ship) {
	const { position, direction } = transform;
	const rot = Math.floor(transform.rot);

	let def = { 
		normal: direction,
		angle: rot,
		target: direction
	};
	const maybeWall = cast(position, rot, FRONT_DIST);

	def = maybeWall.unwrapOrDef(def);

	let angle = rot;
	const maybeLeft = cast(position, rot + 90, SIDES_DIST);
	angle = maybeLeft.unwrapOrDo(() => {
		const maybeRight = cast(position, rot - 90, SIDES_DIST);
		return maybeRight.unwrapOrDef(def);
	}).angle;
	
	// most likely branch
	if (angle === rot) {
		return rot;
	}
	
	return transform.lerpRot(angle, true);
}
