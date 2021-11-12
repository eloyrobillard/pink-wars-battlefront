import { Transform2D, RigidBody2D, Model2D, Anchor } from '../components/index';
import { getAnchor } from './behavior/flocking';
import { vec2 } from '../types/index';

export class Ship {
	anchor: Anchor | null = null;
	transform: Transform2D;
	rb: RigidBody2D = {
		speed: 100
	};
	body = new Model2D(
		3, 
		[ new vec2(-15, -4), new vec2(0, 0), new vec2(-15, 4) ],
		!this.isSquadLeader ? 255 : 0
	);

	constructor (position: vec2, rot: number, public isSquadLeader: boolean = false) {
		this.transform = new Transform2D(position, rot);
	}

	ready() {
		if (!this.isSquadLeader) this.anchor = getAnchor(this);
	}

	update () {
		if (this.anchor) this.anchor.update(this);
		else if (!this.isSquadLeader) this.anchor = getAnchor(this);

		this.transform.update(this.rb.speed);
		this.body.update(this.transform);
	}
}
