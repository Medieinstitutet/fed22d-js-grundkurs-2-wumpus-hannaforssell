// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import './style/style.scss';

import Game from './gameboard';
import Renderer from './renderer';

// *********************************************************
// ---------------- Creating the gameboard -----------------
// *********************************************************

const renderer = new Renderer('#boardContainer', '#arrows', '#moves');

const game = new Game();

renderer.renderAll(game);

setTimeout(() => renderer.renderAll(game), 3000);

game.movePlayer('East');

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
 * "Du får också i varje rum reda på vilka rum som ligger intill" ?
 * --
 * Shoot Wumpus to win
 * You get five arrows
 * An arrow moves three room, you choose direction in every room.
 * "Glöm inte bort att tunnlarna vindlar sig på oväntade sätt. ->
 * Du kan råka skjuta dig själv"
 * --
 * Game over when Wumpus or player dies
 * "Spara antalet drag som en spelare gör ->
 * och om man vinner så sparas detta i en highscore."
 */

/**
 * TODO
 * Random placement for player
 * Land solo (no dangers)
 * listAdjacentRooms (close to the player) (ex: 1,7,11,10)
 * --
 * A input box
 */
