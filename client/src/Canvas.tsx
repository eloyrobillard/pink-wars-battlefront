import Game from './game-engine/index';
import DebugApi from './DebugApi';
import Sketch from 'react-p5';
import p5Types from 'p5';
import './style/Canvas.css' //Import this for typechecking and intellisense;

// let start = performance.now();
export default function Canvas () {

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		// NOTE -1 on all width/height vals to prevent scroll bars
		const canvasDiv = document.getElementById('canvas') as HTMLDivElement;
		const { width, height } = canvasDiv.getBoundingClientRect();
		p5.createCanvas(width, height).parent(canvasParentRef);
		Game.start();
		// always fit canvas to view
		window.addEventListener('resize', () => {
			const { width, height } = canvasDiv.getBoundingClientRect();
			p5.resizeCanvas(width, height)
		});
	};

	// redraw canvas on every browser update
	const draw = (p5: p5Types) => {
		if (Game.frameIsReady()) {
			Game.update();
			p5.background('#ffdbed');
			// p5.noStroke();
			Game.Pool.map((squadron) => {
				const { color } = squadron;
				squadron.map((ship) => {
					// console.log(ship)
					const { model } = ship;
					p5.beginShape();
					const c = p5.color(color);
					p5.fill(c);
					model.vertices.forEach(({ x, y }) => {
						p5.vertex(x, y);
					})
					p5.endShape('close');

					// DEBUG
					DebugApi.forEach(p5);
					// if (ship.anchor.isSome) {
					// 	const { x, y } = ship.transform.position;
					// 	const anchor = ship.anchor.unwrap();
					// 	const { x: x2, y: y2 } = anchor!.anchor.transform.position;
					// 	// p5.stroke(51);
					// 	p5.line(x, y, x2, y2);
					// }
		
					return ship;
				});
				return squadron;
			});
		}
		
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
	};

	return (
		<div id="canvas">
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}
