import { vec2, triangle } from './index';
import Game from '../game-engine/index'
import math from '../math/index';

export class Ship {
	base: vec2;
	body: triangle;
	wallEvadeRot = 0;
	// in pixels
	height = 15;
	width = 8;

	constructor ({ x, y }: vec2, public rot: number = 0) {
		this.base = { x, y };
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
		const { x, y } = this.base;
		return (this.base = {
			// left dot
			x: x + speed * math.cos(this.rot + 90) * Game.fixedDeltaTime,
			y: y - speed * math.sin(this.rot + 90) * Game.fixedDeltaTime,
		});
	}

	update(): triangle {
	// TODO extract into math module, to be applicable to triangle arrays
		const { x, y } = this.base;
		return (this.body = {
			// left dot
			x1: x - this.width / 2 * math.sin(this.rot + 90),
			y1: y - this.width / 2 * math.cos(this.rot + 90),
			// front dot
			x2: x + this.height * math.cos(this.rot + 90),
			y2: y - this.height * math.sin(this.rot + 90),
			// right dot
			x3: x + this.width / 2 * math.sin(this.rot + 90),
			y3: y + this.width / 2 * math.cos(this.rot + 90)
		});
	}
}
