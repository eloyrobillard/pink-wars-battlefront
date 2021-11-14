// import Game from './gameLoop';
import { Vec2 } from './types/index';


const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
/**
 * Sets a callback on a timer (in FPS).
 */
function setTimer (count: number, action: () => void) {
	let counter = 0;

	return () => {
		if (counter + 1 < count) {
			return (counter += 1);
		}
		action();
		return (counter = 0);
	};
}

const entrySpots = [
	[
		{ pos: new Vec2(window.innerWidth / 6, 0), rot: 270 },
		{ pos: new Vec2(window.innerWidth / 4, 0), rot: 270 },
		{ pos: new Vec2(window.innerWidth / 2, 0), rot: 270 },
		{ pos: new Vec2(window.innerWidth * 3 / 4, 0), rot: 270 },
		{ pos: new Vec2(window.innerWidth * 5 / 6, 0), rot: 270 }
	],
	[
		{ pos: new Vec2(window.innerWidth, window.innerHeight / 3), rot: 180 },
		{ pos: new Vec2(window.innerWidth, window.innerHeight / 2), rot: 180 },
		{ pos: new Vec2(window.innerWidth, window.innerHeight * 2 / 3), rot: 180 }
	],
	[
		{ pos: new Vec2(window.innerWidth / 6, window.innerHeight), rot: 90 },
		{ pos: new Vec2(window.innerWidth / 4, window.innerHeight), rot: 90 },
		{ pos: new Vec2(window.innerWidth / 2, window.innerHeight), rot: 90 },
		{ pos: new Vec2(window.innerWidth * 3 / 4, window.innerHeight), rot: 90 },
		{ pos: new Vec2(window.innerWidth * 5 / 6, window.innerHeight), rot: 90 }
	],
	[
		{ pos: new Vec2(0, window.innerHeight / 3), rot: 0 },
		{ pos: new Vec2(0, window.innerHeight / 2), rot: 0 },
		{ pos: new Vec2(0, window.innerHeight * 2 / 3), rot: 0 }
	]
];

function enterBattlefield () {
	const randSide = Math.floor(Math.random() * 4);
	const index = Math.floor(Math.random() * entrySpots[randSide].length);
	const res = entrySpots[randSide][index];
	return res;
}

function secToFPS(seconds: number) {
	return FPS * seconds;
}

const GameApi = {
	setTimer,
	enterBattlefield,
	secToFPS,
	fixedDeltaTime,
	fixedDeltaMsec
};

export default GameApi;
