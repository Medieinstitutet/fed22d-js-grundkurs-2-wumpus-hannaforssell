import './style/style.scss';

import generateGameboard from './gameboard';

const boardContainer = document.querySelector('#boardContainer') as HTMLElement;

const board = generateGameboard(5, 5);
let output = '';

for (let y = 0; y < board[0].length; y++) {
  output += '<tr>';
  for (let x = 0; x < board.length; x++) {
    if (board[x][y].hasWumpus) {
      output += '<td class="board-square"><img src="public/wumpus.png"></td>';
    } else {
      output += '<td class="board-square"></td>';
    }
  }
  output += '</tr>';
}

boardContainer.innerHTML = output;

/**
 * Add holes
 */