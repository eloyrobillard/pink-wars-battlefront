import { Vec2 } from '../types/index';
import GameApi from '../GameApi';
import math from '../../math';

export class Transform2D {
	position: Vec2;
	height: number = 15;
	width: number = 8;
	rot: number;
	deltaRot = 0;
	wallEvadeRot = 0;
	direction: Vec2;

	constructor (position: Vec2, rot: number, private rotMultiplier: number) {
		this.position = position;
		this.rot = rot;
		this.direction = this.computeDirection();
	}

	/**
   * Computes direction of transform by applying sin/cos to rotation.
   * @returns Vec2 of magnitude 1 (normalized)
   */
	private computeDirection (): Vec2 {
		return (this.direction = new Vec2(
			math.cosConvert(this.rot),
			-math.sinConvert(this.rot)
		));
	}

	addRot (deltaRot: number): number {
		return (this.deltaRot = deltaRot);
	}

	lerpRot (targetRot: number, forWallRot: boolean = false): number {
		const absDiff = Math.abs(targetRot - this.rot);
		// more than π means faster to turn right
		if (absDiff > 180) {
			// actual diff considering angles are periodic
			const realDiff = 360 - absDiff;
			const dir = this.rot + (this.rot > targetRot ? realDiff : -realDiff);
			const deltaRot = math.lerp(this.rot, dir, GameApi.fixedDeltaTime) - this.rot;
			return forWallRot
				? (this.wallEvadeRot = deltaRot)
				: (this.deltaRot = deltaRot);
		}

		const deltaRot =
			math.lerp(this.rot, targetRot, GameApi.fixedDeltaTime) - this.rot;
		return forWallRot
			? (this.wallEvadeRot = deltaRot)
			: (this.deltaRot = deltaRot);
	}

	private changeRot () {
		// rot always >= 0
		if (this.wallEvadeRot) {
			return (this.rot = ((this.rot + this.wallEvadeRot * this.rotMultiplier) % 360 + 360) % 360);
		} else if (this.deltaRot) {
			return (this.rot = ((this.rot + this.deltaRot * this.rotMultiplier) % 360 + 360) % 360);
		}
		return this.rot;
	}

	moveForward (speed: number = 100): Vec2 {
		const { rot, position: { x, y } } = this;
		return (this.position = new Vec2(
			x + speed * math.cosConvert(rot) * GameApi.fixedDeltaTime,
			y - speed * math.sinConvert(rot) * GameApi.fixedDeltaTime
		));
	}

	reset () {
		this.wallEvadeRot = 0;
		this.deltaRot = 0;
	}

	update (speed: number) {
		this.changeRot();
		this.moveForward(speed);
		this.computeDirection();
		this.reset();
	}
}
