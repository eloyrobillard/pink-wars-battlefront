import { vec2, triangle } from './types/index';
import { Transform2D, RigidBody2D, Model2D } from './components/index';
import Game from './index'
import math from '../math/index';

export class Ship {
	transform: Transform2D = {
		// in pixels
		position: { x: 0, y: 0 },
		height: 15,
		width: 8,
		rot: 0,
	};
	rb: RigidBody2D = {
		speed: 100,
	}
	body: Model2D = {
		vertices: Array.from({ length : 3}),
		offsets: [
			{ x: -4, y: 15 },
			{ x: 0, y: 0 },
			{ x: 4, y: 15 }
		]
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

	addRot(deltaRot: number = 0): number {
		if (!deltaRot) {
			return this.transform.rot;
		}
		// rot always >= 0
		return this.transform.rot = (((this.transform.rot + deltaRot * Game.fixedDeltaTime) % 360) + 360) % 360;
	}

	moveForward(speed: number = 100): vec2 {
		const { x, y } = this.transform.position;
		return (this.transform.position = {
			// left dot
			x: x + speed * math.cos(this.transform.rot) * Game.fixedDeltaTime,
			y: y - speed * math.sin(this.transform.rot) * Game.fixedDeltaTime,
		});
	}

	update(): Model2D {
	// TODO extract into math module, to be applicable to triangle arrays
		const { height, width, rot, position: { x, y }} = this.transform;
		// const bx = x - height * math.cos(this.rb.rot);
		// const by = y + height * math.sin(this.rb.rot);
		for (let i = 0; i < this.body.vertices.length; i += 1) {
			// const { x: vx, y: vy } = this.body.vertices[i];
			const { x: dx, y: dy } = this.body.offsets[i];
			this.body.vertices[i] = {
				x: x - dy * math.cos(rot) + dx * math.sin(rot),
				y: y + dx * math.sin(rot) + dy * math.cos(rot)
			};
		}
		return this.body;
		// return (this.body = {
		// 	// left dot
		// 	x1: bx - this.transform.width / 2 * math.sin(this.rb.rot),
		// 	y1: by - this.transform.width / 2 * math.cos(this.rb.rot),
		// 	// transform dot
		// 	x2: x,
		// 	y2: y,
		// 	// right dot
		// 	x3: bx + this.transform.width / 2 * math.sin(this.rb.rot),
		// 	y3: by + this.transform.width / 2 * math.cos(this.rb.rot)
		// });
	}
}
