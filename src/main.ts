// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import './style/style.scss';

import Game from './game';
import Renderer from './renderer';

// *********************************************************
// ---------------- Creating the gameboard -----------------
// *********************************************************

const renderer = new Renderer('#boardContainer', '#arrows', '#moves');

const game = new Game(5, 4, renderer);

setTimeout(() => game.movePlayer('East'), 1000);
// setTimeout(() => game.movePlayer('East'), 2000);
// setTimeout(() => game.movePlayer('East'), 3000);

// console.log(game.playerX);
// console.log(game.playerY);

// console.log(game.adjacentRooms());

console.log(game.triggerEvents());

console.log(game);

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
 * regex for moveplayer()
 * --
 * To fix later:
 * Input/output
 * Shooting arrows
 * Highscore (for wins only?)
 * display gameover in output for triggerEvents function
 */
