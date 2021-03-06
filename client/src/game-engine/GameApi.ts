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

let entrySpots = [
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

window.addEventListener('resize', () => entrySpots = [
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
]);

function enterBattlefield () {
	const randSide = Math.floor(Math.random() * 4);
	const index = Math.floor(Math.random() * entrySpots[randSide].length);
	const res = entrySpots[randSide][index];
	return res;
}

const battleStartSpots = (() => {
	const availableSpots = [ 0, 1, 2, 3 ];
	return () => {
		if (availableSpots.length === 0) {
			availableSpots.push(0, 1, 2, 3);
		}
		const randSide = Math.floor(Math.random() * availableSpots.length);
		const side = availableSpots.splice(randSide, 1)[0];
		const middle = Math.floor(entrySpots[side].length / 2);
		const res = [
			entrySpots[side][middle-1],
			entrySpots[side][middle],
			entrySpots[side][middle+1],
		];
		return res;
	};
})();

function secToFPS(seconds: number) {
	return FPS * seconds;
}

const GameApi = {
	setTimer,
	enterBattlefield,
	secToFPS,
	fixedDeltaTime,
	fixedDeltaMsec,
	battleStartSpots
};

export default GameApi;
