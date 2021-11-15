// import { Battalion } from './game-objects/battalion';
import Pool from './game-objects/pool';
import GameApi from './GameApi';

let frameStart = 0;

const POOL_LEN = 3;

function start () {
	frameStart = performance.now();

	Pool.map((battalion) => {
		battalion.start();
		return battalion;
	});
}

function frameIsReady () {
	const now = performance.now();
	const delta = now - frameStart;
	if (delta >= GameApi.fixedDeltaMsec) {
		frameStart = performance.now();
		return true;
	}
	return false;
}

// perform routine squadron update
function update () {
	addSquadronTimer();

	Pool.map((battalion) => {
		battalion.update();
		return battalion;
	});
}

// function removeSquadron(battalionId: number, squadId: number) {
// 	Pool.replace(battalionId, squadId);
// }

const addSquadronTimer = GameApi.setTimer(GameApi.secToFPS(10), () => {
	const rand = Math.floor(Math.random() * POOL_LEN);
	Pool.enrollSquadron(rand);
});


const Game = { start, frameIsReady, Pool, update };

export default Game;
