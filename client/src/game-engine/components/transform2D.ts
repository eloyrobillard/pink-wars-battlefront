import { vec2 } from '../types/index';
import Game from '../index';
import math from '../../math';

export class Transform2D {
  position: vec2;
  height: number = 15;
  width: number = 8;
  rot: number;
  deltaRot = 0;
  wallEvadeRot = 0;
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

  addRot (deltaRot: number): number {
		return this.deltaRot = deltaRot;
	}

  lerpRot(targetRot: number): number {
    const absDiff = Math.abs(targetRot - this.rot);
    // more than π means faster to turn right
    if (absDiff > 180) {
      // actual diff considering angles are periodic
      const realDiff = 360 - absDiff;
      return this.addRot(math.lerp(this.rot,  this.rot - realDiff, Game.fixedDeltaTime) - this.rot);
    }
    return this.addRot(math.lerp(this.rot, targetRot, Game.fixedDeltaTime) - this.rot);
  }

  lerpWallRot(targetRot: number): number {
    const absDiff = Math.abs(targetRot - this.rot);
    // more than π means faster to turn right
    if (absDiff > 180) {
      // actual diff considering angles are periodic
      const realDiff = 360 - absDiff;
      return this.addWallRot(math.lerp(this.rot,  this.rot - realDiff, Game.fixedDeltaTime) - this.rot);
    }
    return this.addWallRot(math.lerp(this.rot, targetRot, Game.fixedDeltaTime) - this.rot);
  }

  private addWallRot(deltaRot: number) {
    return this.wallEvadeRot = deltaRot;
  }

  private changeRot() {
		// rot always >= 0
    if (this.wallEvadeRot) {
      return (this.rot = (((this.rot + this.wallEvadeRot) % 360) + 360) % 360);  
    } else if (this.deltaRot) {
      return (this.rot = (((this.rot + this.deltaRot) % 360) + 360) % 360);
    }
    return this.rot;
  }

  moveForward (speed: number = 100): vec2 {
		const { rot, position: { x, y } } = this;
		return (this.position = new vec2(
			x + speed * math.cosConvert(rot) * Game.fixedDeltaTime,
			y - speed * math.sinConvert(rot) * Game.fixedDeltaTime
		));
	}

  reset() {
    this.wallEvadeRot = 0;
    this.deltaRot = 0;
  }

  update(speed: number) {
    this.changeRot();
    this.moveForward(speed);
    this.computeDirection();
    this.reset();
  }
}