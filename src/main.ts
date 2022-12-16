// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import './style/style.scss';

import Game from './game';
// import Renderer from './renderer';
import InputOutput from './inputoutput';

// *********************************************************
// ---------------- Creating the gameboard -----------------
// *********************************************************

const inputOutput = new InputOutput('#input', '#output');
// const renderer = new Renderer('#boardContainer', '#arrows', '#moves');

const game = new Game(5, 4, inputOutput);

game.start();
