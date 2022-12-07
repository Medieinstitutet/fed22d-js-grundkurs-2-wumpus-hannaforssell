// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import Game from './gameboard';

// *********************************************************
// --------------- Creating Renderer class -----------------
// *********************************************************

class Renderer {
  boardContainer: HTMLElement;

  arrowContainer: HTMLElement;

  moveContainer: HTMLElement;

  constructor(boardContainerId: string, arrowContainerId: string, moveContainerId: string) {
    this.boardContainer = document.querySelector(boardContainerId) as HTMLElement;
    this.arrowContainer = document.querySelector(arrowContainerId) as HTMLElement;
    this.moveContainer = document.querySelector(moveContainerId) as HTMLElement;
  }

  renderBoard(game: Game) {
    let output = '';

    for (let y = 0; y < game.board[0].length; y++) {
      output += '<tr>';

      for (let x = 0; x < game.board.length; x++) {
        if (game.playerX === x && game.playerY === y) {
          output += `<td class="board-square"> ${game.board[x][y].id} <img src="/player.jpg" width="50"></td>`;
        } else if (game.board[x][y].hasWumpus) {
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
    this.boardContainer.innerHTML = output;
  }

  renderArrows(game: Game) {
    this.arrowContainer.innerHTML = game.arrowCount.toString();
  }

  renderMoves(game: Game) {
    this.moveContainer.innerHTML = game.moveCount.toString();
  }

  renderAll(game: Game) {
    this.renderBoard(game);
    this.renderArrows(game);
    this.renderMoves(game);
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default Renderer;
