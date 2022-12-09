// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import Room from './room';

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

  renderBoard(gameboard: Room[][], playerX: number, playerY: number) {
    let output = '';

    for (let y = 0; y < gameboard[0].length; y++) {
      output += '<tr>';

      for (let x = 0; x < gameboard.length; x++) {
        if (playerX === x && playerY === y) {
          output += `<td class="board-square"> ${gameboard[x][y].id} <img src="/player.jpg" width="50"></td>`;
        } else if (gameboard[x][y].hasWumpus) {
          output += `<td class="board-square"> ${gameboard[x][y].id} <img src="/wumpus.png" width="50"></td>`;
        } else if (gameboard[x][y].hasHole) {
          output += `<td class="board-square"> ${gameboard[x][y].id} <img src="/hole.jpg" width="50"></td>`;
        } else if (gameboard[x][y].hasBat) {
          output += `<td class="board-square"> ${gameboard[x][y].id} <img src="/bats.jpg" width="50"></td>`;
        } else {
          output += `<td class="board-square"> ${gameboard[x][y].id} </td>`;
        }
      }
      output += '</tr>';
    }
    this.boardContainer.innerHTML = output;
  }

  renderArrows(arrowCount: number) {
    this.arrowContainer.innerHTML = arrowCount.toString();
  }

  renderMoves(moveCount: number) {
    this.moveContainer.innerHTML = moveCount.toString();
  }

  renderAll(gameboard: Room[][], playerX: number, playerY:number, arrowCount: number, moveCount: number) {
    this.renderBoard(gameboard, playerX, playerY);
    this.renderArrows(arrowCount);
    this.renderMoves(moveCount);
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default Renderer;
