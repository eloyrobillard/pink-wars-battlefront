import { Transform2D, RigidBody2D, Trigger2D, Model2D, Anchor } from '../components/index';
import { Vec2, Maybe, Some, None } from '../types/index';
import { Missile } from './missile';
import GameApi from '../GameApi';

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

	missiles: Missile[] = [];

	constructor (position: Vec2, rot: number, rank: number = 0) {
		this.transform = new Transform2D(position, rot);
		this.rank = rank;
		this.model = new Model2D(
			3, 
			[ new Vec2(-15, -4), new Vec2(0, 0), new Vec2(-15, 4) ],
			!rank ? 255 : 0,
			this.transform
		);
		this.trigger = new Trigger2D(this.transform, this.model, this.onTrigger);
	}

	setFollower(follower: Ship) {
		this.follower = new Some(follower);
	}

	onTrigger(col: Trigger2D) {

  }

	start() {
		this.missiles[0] = Missile.fire(this.transform.position, this.transform.rot, /* this.type */);
	}

	updateFireCounter = GameApi.setTimer(30, () => {
		// const missile = Missile.fire(this.transform.position, this.transform.rot, /* this.type */);
		delete this.missiles[0];
		// this.missiles[0] = missile;
	});

	update () {
		this.updateFireCounter();
		this.missiles.map((missile) => missile.update());

		this.anchor.map((anchor) => {
			anchor.update(this);
			return anchor;
		});

		this.transform.update(this.rb.speed);
		this.model.update(this.transform);
	}
}
