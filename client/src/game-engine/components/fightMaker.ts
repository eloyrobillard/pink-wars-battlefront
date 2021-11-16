import { Squadron } from '../game-objects/squadron';
import { Maybe, None } from '../types/index';
import Behavior from '../game-objects/behavior';
import { Ship } from '../game-objects/ship';
import GameApi from '../GameApi';
import Game from '../gameLoop';

export class FightMaker {
	opponent: Maybe<Squadron> = new None();

	constructor (public battalionId: number, private leader: Ship) {}

	update (leader: Ship) {
		this.leader = leader;
		this.querySwitchOpponent();
		if (this.opponent.isSome) {
			this.updateFight(this.opponent.unwrap()!);
		} else {
			this.queryOpponent();
		}
	}

  /**
   * Switch opponent on a timer, to keep squadrons from circling.
   */
	private querySwitchOpponent = GameApi.setTimer(GameApi.secToFPS(5), () => this.queryOpponent());

	onDestroy () {
		this.opponent.map((opponent) => {
			opponent.fightMaker.onDestroyOpponent();
			return opponent;
		});
	}

	onDestroyOpponent () {
		this.opponent = new None();
	}

	updateFight (opponent: Squadron) {
    if (this.leader.anchor.isNone || this.leader.anchor.unwrap()!.anchor !== opponent.leader) {
      Behavior.setAnchor(this.leader, opponent.leader);
    }
	}

	queryOpponent () {
		this.opponent = Game.Pool.getRand(this.battalionId);
	}
}
