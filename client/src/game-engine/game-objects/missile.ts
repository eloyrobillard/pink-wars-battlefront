import { Transform2D, RigidBody2D, Model2D, Collider2D, Trigger2D, Missiles } from '../components/index';
import { Vec2 } from '../types/index';

export class Missile {
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 800
	};
	model: Model2D;
	collider: Collider2D;

	constructor (private missiles: Missiles, pos: Vec2, rot: number, public battalionId: number, private id: number) {
		this.transform = new Transform2D(pos, rot);
		this.model = new Model2D([ new Vec2(-5, 0), new Vec2(0, 0) ], 0, this.transform);
		this.collider = new Collider2D(this, this.transform);
	}

	onCollide (col: Trigger2D) {
		if (col.object.battalionId !== this.battalionId) {
			this.missiles.destroy(this.id);
		}
	}

	update () {
		this.collider.update();
		
		this.transform.update(this.rb.speed);
		this.model.update(this.transform);
	}
}
