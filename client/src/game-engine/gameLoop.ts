import { Battalion } from './game-objects/battalion';
import Pool from './game-objects/pool';
import GameApi from './GameApi';

const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

const POOL_LEN = 3;

function start () {
	frameStart = performance.now();

	Pool.set(Array.from({ length: POOL_LEN }, (_, i) => new Battalion(i, 255 / (i + 1))));
	Pool.map((squadron) => {
		squadron.start();
		return squadron;
	});
}

function frameIsReady () {
	const now = performance.now();
	const delta = now - frameStart;
	if (delta >= fixedDeltaMsec) {
		frameStart = performance.now();
		return true;
	}
	return false;
}

// perform routine squadron update
function update () {
	addSquadronTimer();

	Pool.map((squadron) => {
		squadron.update();
		return squadron;
	});
}

function removeSquadron(squadId: number) {
	Pool.replace(squadId);
}

const addSquadronTimer = GameApi.setTimer(300, () => {
	const rand = Math.floor(Math.random() * POOL_LEN);
	Pool.enrollSquadron(rand);
});

const Game = { FPS, fixedDeltaTime, start, frameIsReady, Pool, update, removeSquadron };

export default Game;
