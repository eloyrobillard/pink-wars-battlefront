import p5Types from 'p5';

const stack: ((p5: p5Types) => void)[] = [];

function placeP5Call (cb: (p5: p5Types) => void) {
	stack.push(cb);
}

function forEach (p5: p5Types) {
	let cb: undefined | ((p5: p5Types) => void);
	while ((cb = stack.pop())) {
		cb(p5);
	}
}

const DebugApi = {
	forEach,
	placeP5Call,
	p5: p5Types
};

export default DebugApi;
