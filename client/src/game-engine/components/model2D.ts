import { vec2 } from '../types/index';
import math from '../../math/index';
import { Transform2D } from './index';

export class Model2D {
  // bounds of polygon to print in p5.draw
  vertices: vec2[];
  // offsets from transform.position for each bound
  offsets: vec2[];
  color: number;

  constructor(numVerts: number, offsets: vec2[], color: number) {
    this.vertices = Array.from({ length: numVerts });
    this.offsets = offsets;
    this.color = color;
  }

  update(transform: Transform2D) {
    const { rot, position: { x, y } } = transform;
		for (let i = 0; i < this.vertices.length; i += 1) {
			const { x: dx, y: dy } = this.offsets[i];
			this.vertices[i] = new vec2(
				// https://www.wikiwand.com/en/Rotation_matrix
				x + dx * math.cosConvert(rot) - dy * math.sinConvert(rot),
				y - dx * math.sinConvert(rot) - dy * math.cosConvert(rot)
      );
		}
  }
}