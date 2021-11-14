import { Ship } from '../game-objects/ship';
import Game from '../gameLoop';

export class FightMaker {
  inCombat = false;

  update(leader: Ship) {
    if (this.inCombat) {

    } else {
      this.queryOpponent();
    }
  }

  fireNow() {

  }

  queryOpponent() {
    const maybeOpponent = Game.findSquadron((squadron) => !squadron.inCombat);
  }
}