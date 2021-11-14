import {
	Transform2D,
	RigidBody2D,
	Trigger2D,
	Model2D,
	Anchor,
	Missiles
} from '../components/index';
import { Vec2, Maybe, Some, None } from '../types/index';
// import { Missile } from './missile';
// import GameApi from '../GameApi';

export class Ship {
	anchor: Maybe<Anchor> = new None();
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 100
	};
	model: Model2D;
	trigger: Trigger2D;

	rank: number;
	follower: Maybe<Ship> = new None();

	missiles: Missiles;

	constructor (position: Vec2, rot: number, rank: number = 0) {
		this.transform = new Transform2D(position, rot);
		this.rank = rank;
		this.model = new Model2D(
			3,
			[
				new Vec2(-15, -4),
				new Vec2(0, 0),
				new Vec2(-15, 4)
			],
			255,
			this.transform
		);
		this.trigger = new Trigger2D(this.transform, this.model, () => {
			return;
		});
		this.missiles = new Missiles(this.transform);
	}

	setFollower (follower: Ship) {
		this.follower = new Some(follower);
	}

	start () {}

	update () {
		this.missiles.update();

		this.anchor.map((anchor) => {
			anchor.update(this);
			return anchor;
		});

		this.transform.update(this.rb.speed);
		this.model.update(this.transform);
	}
}
