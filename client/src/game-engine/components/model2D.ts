import { Vec2 } from '../types/index';
import math from '../../math/index';
import { Transform2D } from './index';

export class Model2D {
	// bounds of polygon to print in p5.draw
	vertices: Vec2[];
	// offsets from transform.position for each bound
	offsets: Vec2[];
	color: number;

	constructor (
		numVerts: number,
		offsets: Vec2[],
		color: number,
		transform: Transform2D
	) {
		this.offsets = offsets;
		this.vertices = this.initVertices(numVerts, transform);
		this.color = color;
	}

	initVertices (numVerts: number, transform: Transform2D) {
		const { rot, position: { x, y } } = transform;
		const verts = [];
		for (let i = 0; i < numVerts; i += 1) {
			const { x: dx, y: dy } = this.offsets[i];
			verts.push(
				new Vec2(
					// https://www.wikiwand.com/en/Rotation_matrix
					x + dx * math.cosConvert(rot) - dy * math.sinConvert(rot),
					y - dx * math.sinConvert(rot) - dy * math.cosConvert(rot)
				)
			);
		}
		return verts;
	}

	update (transform: Transform2D) {
		const { rot, position: { x, y } } = transform;
		for (let i = 0; i < this.vertices.length; i += 1) {
			const { x: dx, y: dy } = this.offsets[i];
			this.vertices[i] = new Vec2(
				// https://www.wikiwand.com/en/Rotation_matrix
				x + dx * math.cosConvert(rot) - dy * math.sinConvert(rot),
				y - dx * math.sinConvert(rot) - dy * math.cosConvert(rot)
			);
		}
	}
}
