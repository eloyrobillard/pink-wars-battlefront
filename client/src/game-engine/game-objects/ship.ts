import { Transform2D, RigidBody2D, Trigger2D, Model2D, Anchor } from '../components/index';
import { vec2, Maybe, Some, None } from '../types/index';
import { Missile } from './missile';

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

	constructor (position: vec2, rot: number, rank: number = 0) {
		this.transform = new Transform2D(position, rot);
		this.rank = rank;
		this.model = new Model2D(
			3, 
			[ new vec2(-15, -4), new vec2(0, 0), new vec2(-15, 4) ],
			!rank ? 255 : 0
		);
		this.trigger = new Trigger2D(this.transform, this.model, this.onTrigger);
	}

	setFollower(follower: Ship) {
		this.follower = new Some(follower);
	}

	start() {
		// if (!this.isSquadLeader) this.anchor = new Some(getAnchor(this));
		this.model.start(this.transform);
	}

	onTrigger(col: Trigger2D) {

  }

	/**
	 * Shoots a missile per second.
	 * @returns counter
	 */
	updateFireCounter = (() => {
			let counter = 0;

			return () => {
				if ((counter + 1) < 30) {
					return counter += 1;
				}
				const missile = Missile.fire(this.transform.position, this.transform.rot);
				this.missiles.push(missile);
				return counter = 0;
			};
		})();

	update () {
		this.updateFireCounter();
		this.missiles.map((missile) => missile.update());

		this.anchor.map((anchor) => {
			anchor.update(this);
			return anchor;
		});
		// else if (!this.isSquadLeader) this.anchor = new Some(getAnchor(this));

		this.transform.update(this.rb.speed);
		this.model.update(this.transform);
	}
}
