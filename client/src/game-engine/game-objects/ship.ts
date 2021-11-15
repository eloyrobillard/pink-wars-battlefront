import {
	Transform2D,
	RigidBody2D,
	Trigger2D,
	Collider2D,
	Model2D,
	HitBox2D,
	Anchor,
	Missiles
} from '../components/index';
import { Vec2, Maybe, Some, None } from '../types/index';
import { xWing } from './ship-model/xWing';
// import { Missile } from './missile';
import { Squadron } from './squadron';
// import GameApi from '../GameApi';

export class Ship {
	anchor: Maybe<Anchor> = new None();
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 200
	};
	model: Model2D;
	hitbox: HitBox2D;
	trigger: Trigger2D;

	rank: number;
	follower: Maybe<Ship> = new None();
	squadId: number;

	missiles: Missiles;

	constructor (
		position: Vec2,
		rot: number,
		private squadron: Squadron,
		public battalionId: number,
		rank: number = 0
	) {
		this.transform = new Transform2D(position, rot);
		this.rank = rank;
		this.squadId = squadron.id;
		this.model = new Model2D(xWing.model, 255, this.transform);
		this.hitbox = new HitBox2D(
			[
				new Vec2(-25, -4),
				new Vec2(-10, 0),
				new Vec2(-25, 4)
			],
			this.transform
		);
		this.trigger = new Trigger2D(this, this.transform, this.hitbox);
		this.missiles = new Missiles(this.battalionId, this.transform);
	}

	// NOTE keep empty
	onCollide (col: Collider2D) {
		if (col.object.battalionId !== this.battalionId) {
			this.squadron.onCasualty(this.rank);
		}
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
		this.hitbox.update();
	}
}
