import { vec2, triangle } from './index';
import Game from '../game-engine/index'
import math from '../math/index';

export class Ship {
	back: vec2;
	body: triangle;
	// in pixels
	height = 15;
	width = 8;

	constructor ({ x, y }: vec2, public rot: number = 0) {
		this.back = { x, y };
		this.body = this.orientBody();
	}

	addRot(deltaRot: number): triangle {
		this.rot += deltaRot * Game.fixedDeltaTime;
		return (this.body = {
			// left dot
			x1: this.back.x - this.width / 2 * math.sin(this.rot - 90),
			y1: this.back.y - this.width / 2 * math.cos(this.rot - 90),
			// front dot
			x2: this.back.x + this.height * math.cos(this.rot - 90),
			y2: this.back.y - this.height * math.sin(this.rot - 90),
			// right dot
			x3: this.back.x + this.width / 2 * math.sin(this.rot - 90),
			y3: this.back.y + this.width / 2 * math.cos(this.rot - 90)
		});
	}

	private orientBody (): triangle {
		return (this.body = {
			// left dot
			x1: this.back.x - this.width / 2 * math.sin(this.rot - 90),
			y1: this.back.y - this.width / 2 * math.cos(this.rot - 90),
			// front dot
			x2: this.back.x + this.height * math.cos(this.rot - 90),
			y2: this.back.y - this.height * math.sin(this.rot - 90),
			// right dot
			x3: this.back.x + this.width / 2 * math.sin(this.rot - 90),
			y3: this.back.y + this.width / 2 * math.cos(this.rot - 90)
		});
	}
}
