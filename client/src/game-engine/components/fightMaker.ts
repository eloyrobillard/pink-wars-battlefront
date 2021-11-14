import { Ship } from '../game-objects/ship';
import Game from '../gameLoop';

export class FightMaker {
  inCombat = false;

  constructor(public squadronId: number) {}

  update(leader: Ship) {
    if (this.inCombat) {

    } else {
      this.queryOpponent();
    }
  }

  fireNow() {

  }

  queryOpponent() {
    const maybeOpponent = Game.Pool.findSquadron((squadron) => !squadron.inCombat);
    const opponent = maybeOpponent.unwrapOrDo(() => {
      return Game.Pool.getRand(this.squadronId);
    });
  }
}