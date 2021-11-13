import { Transform2D, RigidBody2D, Model2D, Collider2D, Trigger2D } from '../components/index';
import { vec2 } from '../types/index';

export class Missile {
  transform: Transform2D;
	rb: RigidBody2D = {
		speed: 200
	};
	model: Model2D;
  collider: Collider2D;

  constructor(pos: vec2, rot: number) {
    this.transform = new Transform2D(pos, rot);
    this.model = new Model2D(
			2, 
			[ new vec2(-10, 0), new vec2(0, 0) ],
			0
		);
    this.collider = new Collider2D(this.transform, this.model, this.onCollide);
  }

  onCollide(col: Trigger2D) {

  }

  update() {
    this.collider.update();
  }
}