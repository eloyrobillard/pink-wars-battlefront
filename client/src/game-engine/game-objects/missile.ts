import { Transform2D, RigidBody2D, Model2D, Collider2D, Trigger2D } from '../components/index';
import { Vec2 } from '../types/index';

export class Missile {
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 800
	};
	model: Model2D;
	collider: Collider2D;

	constructor (pos: Vec2, rot: number, private destroy: () => void) {
		this.transform = new Transform2D(pos, rot);
		this.model = new Model2D(2, [ new Vec2(-10, 0), new Vec2(0, 0) ], 0, this.transform);
		this.collider = new Collider2D(this.transform, this.model, this.onCollide);
	}

	/**
	 * Instantiates a missile with the given parameters.
	 * @param pos position fired from
	 * @param rot 
	 */
	static fire(pos: Vec2, rot: number, destroy: () => void) {
		return new Missile(pos, rot, destroy);
	}

	onCollide () {
		this.destroy();
	}

	update () {
		this.collider.update();

		this.transform.update(this.rb.speed);
		this.model.update(this.transform);
	}
}
