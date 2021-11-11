import Game from './game-engine/index';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

// let start = performance.now();
export default function Canvas () {

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		// NOTE -1 on all width/height vals to prevent scroll bars
		p5.createCanvas(window.innerWidth - 1, window.innerHeight - 1).parent(canvasParentRef);
		// always fit canvas to window
		window.addEventListener('resize', () => p5.resizeCanvas(window.innerWidth - 1, window.innerHeight - 1));
		Game.start();
	};

	// redraw canvas on every browser update
	// TODO only draw on fixedDeltaTime -> invoke game loop
	const draw = (p5: p5Types) => {
		if (Game.frameIsReady()) {
			// Game.update();
			// const now = performance.now();
			// const delta = now - start;
			// console.log(delta);
			// start = now;
			p5.background('#ffdbed');
			p5.noStroke();
			Game.pool.map((ship, i) => {
				ship.move(-1);
				const { body } = ship;
				const { x1, y1, x2, y2, x3, y3 } = body;
				p5.triangle(x1, y1, x2, y2, x3, y3);
	
				return ship;
			});
		}
		
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
	};

	return (
		<div className=".Canvas">
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}
