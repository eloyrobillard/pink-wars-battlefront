import { Transform2D, RigidBody2D, Model2D, Anchor } from '../components/index';
import { getAnchor } from './behavior/flocking';
import { vec2, Maybe, Some, None } from '../types/index';

export class Ship {
	anchor: Maybe<Anchor> = new None();
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 100
	};
	body: Model2D;

	isSquadLeader;
	follower: Maybe<Ship> = new None();

	constructor (position: vec2, rot: number, isSquadLeader: boolean = false) {
		this.transform = new Transform2D(position, rot);
		this.isSquadLeader = isSquadLeader;
		this.body = new Model2D(
			3, 
			[ new vec2(-15, -4), new vec2(0, 0), new vec2(-15, 4) ],
			!isSquadLeader ? 255 : 0
		);
	}

	setFollower(follower: Ship) {
		this.follower = new Some(follower);
	}

	ready() {
		if (!this.isSquadLeader) this.anchor = new Some(getAnchor(this));
	}

	update () {
		if (this.anchor.isSome) this.anchor.map((anchor) => {
			anchor.update(this);
			return anchor;
		});
		else if (!this.isSquadLeader) this.anchor = new Some(getAnchor(this));

		this.transform.update(this.rb.speed);
		this.body.update(this.transform);
	}
}
