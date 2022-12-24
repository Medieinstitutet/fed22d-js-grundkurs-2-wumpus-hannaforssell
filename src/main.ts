// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import './style/style.scss';

import Game from './game';
import Renderer from './renderer';
import InputOutput from './inputoutput';

// *********************************************************
// ---------------- Creating the gameboard -----------------
// *********************************************************

const inputOutput = new InputOutput('#input', '#output');
const renderer = new Renderer('#boardContainer', '#arrows', '#moves');

const game = new Game(inputOutput, renderer);

game.start(5, 4);
