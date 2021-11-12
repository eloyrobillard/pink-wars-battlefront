import math from '../../math';
import { vec2 } from '../types/index';

export class Transform2D {
  position: vec2;
  height: number = 15;
  width: number = 8;
  rot: number;
  direction: vec2;

  constructor(position: vec2, rot: number) {
    this.position = position;
    this.rot = rot;
    this.direction = this.computeDirection();
  }

  /**
   * Computes direction of transform by applying sin/cos to rotation.
   * @returns vec2 of magnitude 1 (normalized)
   */
  private computeDirection(): vec2 {
    return this.direction = new vec2(
      math.cosConvert(this.rot),
      math.sinConvert(this.rot),
    )
  }

  update(speed: number) {
    this.computeDirection();
  }
}