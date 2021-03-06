import { Transform2D } from './index';
import { Vec2 } from '../types/index';
import math from '../../math';
import DebugApi from '../../DebugApi';

export class HitBox2D {
	vertices: Vec2[];
	offsets: Vec2[];

	constructor (modelOffsets: Vec2[], private transform: Transform2D) {
		this.offsets = modelOffsets;
		this.vertices = this.placeHitBox();
	}

	// private scaleHitBox (offsets: Vec2[]): Vec2[] {
	// 	return offsets.map((vec) => new Vec2(vec.x, vec.y));
	// }

	private placeHitBox () {
		const { direction, position, rot } = this.transform;
		const x = position.x + direction.x;
		const y = position.y + direction.y;

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
    this.debug();
  }

  private debug() {
    DebugApi.placeP5Call((p5) => {
      this.vertices.forEach((vertex) => p5.point(vertex.x, vertex.y));
    });
  }
}
