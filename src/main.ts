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
// const renderer = new Renderer('#boardContainer', '#arrows', '#moves');

const game = new Game(5, 4, inputOutput);

game.start();

// *********************************************************
// -------------------------- Notes ------------------------
// *********************************************************

/**
 * RULES:
 * 20 rooms
 * Go north, east, south, west
 * (20%) When stepping on a hole, you fall and die
 * (30%) When meeting bats, they pick you up and fly with you to another room
 * When meeting Wumpus, you get eaten and die
 * --
 * Only one danger per room
 * --
 * In rooms close to holes, you sense the smell of sewage
 * In rooms close to Wumpus, you sense the smell of him
 * Adjacent rooms displays of the two above
 * --
 * Shoot Wumpus to win
 * You get five arrows
 * An arrow moves three room, you choose direction in every room.
 * "Glöm inte bort att tunnlarna vindlar sig på oväntade sätt. ->
 * Du kan råka skjuta dig själv"
 * --
 * Game over when Wumpus or player dies
 * Saves every move, displays highscore when player wins
 */

/**
 * TODO
 * remove display of debugging code
 * fix intro
 * make state into enum
 * regex into action.ts
 */
