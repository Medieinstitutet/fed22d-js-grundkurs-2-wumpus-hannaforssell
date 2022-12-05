import './style/style.scss';

import generateGameboard from './gameboard';

const boardContainer = document.querySelector('#boardContainer') as HTMLElement;

const board = generateGameboard(5, 5);
let output = '';

for (let y = 0; y < board[0].length; y++) {
  output += '<tr>';
  for (let x = 0; x < board.length; x++) {
    output += `<td> ${board[x][y].hasWumpus.toString()} </td>`;
  }
  output += '</tr>';
}

boardContainer.innerHTML = output;

/**
 * Make grid
 * Add wumpus
 * Add holes
 */
