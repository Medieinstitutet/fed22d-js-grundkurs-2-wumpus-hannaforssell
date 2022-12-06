// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import './style/style.scss';

import Game from './gameboard';

// *********************************************************
// ---------------- Creating the gameboard -----------------
// *********************************************************

const boardContainer = document.querySelector('#boardContainer') as HTMLElement;
const arrows = document.querySelector('#arrows') as HTMLElement;

const game = new Game();

arrows.innerHTML = game.arrowCount.toString();

let output = '';

for (let y = 0; y < game.board[0].length; y++) {
  output += '<tr>';
  for (let x = 0; x < game.board.length; x++) {
    if (game.board[x][y].hasWumpus) {
      output += `<td class="board-square"> ${game.board[x][y].id} <img src="/wumpus.png" width="50"></td>`;
    } else if (game.board[x][y].hasHole) {
      output += `<td class="board-square"> ${game.board[x][y].id} <img src="/hole.jpg" width="50"></td>`;
    } else if (game.board[x][y].hasBat) {
      output += `<td class="board-square"> ${game.board[x][y].id} <img src="/bats.jpg" width="50"></td>`;
    } else {
      output += `<td class="board-square"> ${game.board[x][y].id} </td>`;
    }
  }
  output += '</tr>';
}

console.log(game.board);

boardContainer.innerHTML = output;

// *********************************************************
// -------------------------- Notes ------------------------
// *********************************************************

/**
 * RULES:
 * 20 rooms
 * Go north, east, south, west
 * (20% )When stepping on a hole, you fall and die
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
 * Put a player on playerX & playerY
 */
