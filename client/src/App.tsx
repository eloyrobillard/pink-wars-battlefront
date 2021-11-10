import Canvas from './Canvas';
import './App.css';

function NavBar () {
	return (
		<div id='nav-bar'>
			<img src='https://fontmeme.com/permalink/211110/50d0d2aa0f0cc86184324342f5bfc93e.png' alt='star-wars-font' />
		</div>
	);
}

function App () {
	return (
		<div className='App'>
			<NavBar />
			<Canvas />
		</div>
	);
}

export default App;
