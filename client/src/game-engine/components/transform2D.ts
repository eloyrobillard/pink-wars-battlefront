import { vec2 } from '../types/index';
import Game from '../index';
import math from '../../math';

export class Transform2D {
  position: vec2;
  height: number = 15;
  width: number = 8;
  rot: number;
  deltaRot = 0;
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

  addRot (deltaRot: number = 0): number {
    if (!deltaRot) {
      return this.deltaRot = 0;
    }
		return this.deltaRot += deltaRot;
	}

  private changeRot() {
		// rot always >= 0
		return (this.rot = ((this.rot + this.deltaRot * Game.fixedDeltaTime) % 360 + 360) % 360);
  }

  moveForward (speed: number = 100): vec2 {
		const { rot, position: { x, y } } = this;
		return (this.position = new vec2(
			x + speed * math.cosConvert(rot) * Game.fixedDeltaTime,
			y - speed * math.sinConvert(rot) * Game.fixedDeltaTime
		));
	}

  update(speed: number) {
    // this.moveForward(speed);
    // this.computeDirection();
  }
}