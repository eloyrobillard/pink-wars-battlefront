import { vec2, triangle } from './index';
import { Transform2D } from '../game-engine/components/transform2D';
import Game from '../game-engine/index'
import math from '../math/index';

export class Ship {
	transform: Transform2D = {
		// in pixels
		position: { x: 0, y: 0 },
		height: 15,
		width: 8,
	};
	body: triangle;
	wallEvadeRot = 0;

	constructor ({ x, y }: vec2, public rot: number = 0) {
		this.transform.position = { x, y };
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
		const { x, y } = this.transform.position;
		return (this.transform.position = {
			// left dot
			x: x + speed * math.cos(this.rot) * Game.fixedDeltaTime,
			y: y - speed * math.sin(this.rot) * Game.fixedDeltaTime,
		});
	}

	update(): triangle {
	// TODO extract into math module, to be applicable to triangle arrays
		const { x, y } = this.transform.position;
		const bx = x - this.transform.height * math.cos(this.rot);
		const by = y + this.transform.height * math.sin(this.rot);
		return (this.body = {
			// left dot
			x1: bx - this.transform.width / 2 * math.sin(this.rot),
			y1: by - this.transform.width / 2 * math.cos(this.rot),
			// transform dot
			x2: x,
			y2: y,
			// right dot
			x3: bx + this.transform.width / 2 * math.sin(this.rot),
			y3: by + this.transform.width / 2 * math.cos(this.rot)
		});
	}
}
