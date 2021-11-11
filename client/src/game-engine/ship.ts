import { vec2 } from './types/index';
import { Transform2D, RigidBody2D, Model2D } from './components/index';
import Game from './index';
import math from '../math/index';

export class Ship {
	transform: Transform2D = {
		// in pixels
		position: { x: 0, y: 0 },
		height: 15,
		width: 8,
		rot: 0
	};
	rb: RigidBody2D = {
		speed: 100
	};
	body: Model2D = {
		vertices: Array.from({ length: 3 }),
		offsets: [ { x: -15, y: -4 }, { x: 0, y: 0 }, { x: -15, y: 4 } ]
	};
	wallEvadeRot = 0;

	constructor ({ x, y }: vec2, rot: number = 0) {
		this.transform = {
			...this.transform,
			position: { x, y },
			rot
		};
		this.body = this.update();
	}

	addRot (deltaRot: number = 0): number {
		// console.log(this.transform.rot);
		if (!deltaRot) {
			return this.transform.rot;
		}
		// rot always >= 0
		return (this.transform.rot = (((this.transform.rot + deltaRot * Game.fixedDeltaTime) % 360) + 360) % 360);
	}

	moveForward (speed: number = 100): vec2 {
		const { rot, position: { x, y } } = this.transform;
		return (this.transform.position = {
			x: x + speed * math.cosConvert(rot) * Game.fixedDeltaTime,
			y: y - speed * math.sinConvert(rot) * Game.fixedDeltaTime
		});
	}

	update (): Model2D {
		// TODO extract into model
		const { rot, position: { x, y } } = this.transform;
		for (let i = 0; i < this.body.vertices.length; i += 1) {
			const { x: dx, y: dy } = this.body.offsets[i];
			this.body.vertices[i] = {
				// https://www.wikiwand.com/en/Rotation_matrix
				x: x + dx * math.cosConvert(rot) - dy * math.sinConvert(rot),
				y: y - dx * math.sinConvert(rot) - dy * math.cosConvert(rot)
			};
		}
		return this.body;
	}
}
