import { vec2, triangle } from './index';
import { Transform2D } from '../game-engine/components/transform2D';
import { RigidBody2D } from '../game-engine/components/rigidBody2D';
import Game from '../game-engine/index'
import math from '../math/index';

export class Ship {
	transform: Transform2D = {
		// in pixels
		position: { x: 0, y: 0 },
		height: 15,
		width: 8,
	};
	rb: RigidBody2D = {
		speed: 100,
		rot: 0,
	}
	body: triangle;
	wallEvadeRot = 0;

	constructor ({ x, y }: vec2, rot: number = 0) {
		this.transform.position = { x, y };
		this.rb.rot = rot;
		this.body = this.update();
	}

	addRot(deltaRot: number = 0): number {
		if (!deltaRot) {
			return this.rb.rot;
		}
		// rot always >= 0
		return this.rb.rot = (((this.rb.rot + deltaRot * Game.fixedDeltaTime) % 360) + 360) % 360;
	}

	moveForward(speed: number = 100): vec2 {
		const { x, y } = this.transform.position;
		return (this.transform.position = {
			// left dot
			x: x + speed * math.cos(this.rb.rot) * Game.fixedDeltaTime,
			y: y - speed * math.sin(this.rb.rot) * Game.fixedDeltaTime,
		});
	}

	update(): triangle {
	// TODO extract into math module, to be applicable to triangle arrays
		const { x, y } = this.transform.position;
		const bx = x - this.transform.height * math.cos(this.rb.rot);
		const by = y + this.transform.height * math.sin(this.rb.rot);
		return (this.body = {
			// left dot
			x1: bx - this.transform.width / 2 * math.sin(this.rb.rot),
			y1: by - this.transform.width / 2 * math.cos(this.rb.rot),
			// transform dot
			x2: x,
			y2: y,
			// right dot
			x3: bx + this.transform.width / 2 * math.sin(this.rb.rot),
			y3: by + this.transform.width / 2 * math.cos(this.rb.rot)
		});
	}
}
