import { vec2 } from './types/index';
import { Transform2D, RigidBody2D, Model2D } from './components/index';
import Game from './index';
import math from '../math/index';

export class Ship {
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 100
	};
	body = new Model2D(3, [ { x: -15, y: -4 }, { x: 0, y: 0 }, { x: -15, y: 4 } ]);
	wallEvadeRot = 0;

	constructor (position: vec2, rot: number = 0) {
		this.transform = new Transform2D(position, rot);
	}

	addRot (deltaRot: number = 0): number {
		// console.log(this.transform.rot);
		if (!deltaRot) {
			return this.transform.rot;
		}
		// rot always >= 0
		return (this.transform.rot = ((this.transform.rot + deltaRot * Game.fixedDeltaTime) % 360 + 360) % 360);
	}

	moveForward (speed: number = 100): vec2 {
		const { rot, position: { x, y } } = this.transform;
		return (this.transform.position = {
			x: x + speed * math.cosConvert(rot) * Game.fixedDeltaTime,
			y: y - speed * math.sinConvert(rot) * Game.fixedDeltaTime
		});
	}

	update () {
		this.transform.update(this.rb.speed);
		this.body.update(this.transform);
	}
}
