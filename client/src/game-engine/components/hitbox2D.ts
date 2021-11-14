import { Model2D, Transform2D } from './index';
import { Vec2 } from '../types/index';
import math from '../../math';

export class HitBox2D {
	vertices: Vec2[];
	offsets: Vec2[];

	constructor (private model: Model2D, private transform: Transform2D) {
		this.offsets = this.scaleHitBox();
		this.vertices = this.placeHitBox();
	}

	private scaleHitBox (): Vec2[] {
		const { offsets } = this.model;
		return offsets.map((vec) => new Vec2(vec.x * 2, vec.y * 2));
	}

	private placeHitBox () {
		const { direction, position, rot } = this.transform;
		const { x, y } = new Vec2(
			position.x + direction.x * 5,
			position.y + direction.y * 5
		);

		return Array.from({ length: this.offsets.length }, (_, i) => {
			const { x: dx, y: dy } = this.offsets[i];
			return new Vec2(
				// https://www.wikiwand.com/en/Rotation_matrix
				x + dx * math.cosConvert(rot) - dy * math.sinConvert(rot),
				y - dx * math.sinConvert(rot) - dy * math.cosConvert(rot)
			);
		});
	}

	start () {}

	update () {
    this.vertices = this.placeHitBox();
  }
}
