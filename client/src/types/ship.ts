import { vec2, triangle } from './index';
import Game from '../game-engine/index'
import math from '../math/index';

export class Ship {
	front: vec2;
	base: vec2 = { x: 0, y: 0 };
	body: triangle;
	wallEvadeRot = 0;
	// in pixels
	height = 15;
	width = 8;

	constructor ({ x, y }: vec2, public rot: number = 0) {
		this.front = { x, y };
		this.body = this.update();
	}

	addRot(deltaRot: number = 0): number {
		if (!deltaRot) {
			return this.rot;
		}
		// rot always >= 0
		return this.rot = (((this.rot + deltaRot * Game.fixedDeltaTime) % 360) + 360) % 360;
	}

	moveForward(speed: number = 100): vec2 {
		const { x, y } = this.front;
		return (this.front = {
			// left dot
			x: x + speed * math.cos(this.rot) * Game.fixedDeltaTime,
			y: y - speed * math.sin(this.rot) * Game.fixedDeltaTime,
		});
	}

	update(): triangle {
	// TODO extract into math module, to be applicable to triangle arrays
		const { x, y } = this.front;
		this.base.x = x - this.height * math.cos(this.rot);
		this.base.y = y - this.height * math.sin(this.rot);
		const { x: bx, y: by } = this.base;
		return (this.body = {
			// left dot
			x1: bx - this.width / 2 * math.sin(this.rot),
			y1: by - this.width / 2 * math.cos(this.rot),
			// front dot
			x2: x + math.cos(this.rot),
			y2: y - math.sin(this.rot),
			// right dot
			x3: bx + this.width / 2 * math.sin(this.rot),
			y3: by + this.width / 2 * math.cos(this.rot)
		});
	}
}
