// *********************************************************
// ---------------------- Imports --------------------------
// *********************************************************

import Room from './room';
import Renderer from './renderer';

// *********************************************************
// -------------- Creating a class for Game ----------------
// *********************************************************

class Game {
  arrowCount: number;

  moveCount: number;

  board: Room[][] = [];

  playerX = 0;

  playerY = 0;

  renderer: Renderer | null;

  constructor(width: number, height: number, renderer: Renderer | null = null) {
    this.arrowCount = 5;
    this.moveCount = 0;

    this.generateGameboard(width, height);
    this.randomizePlayerPosition();

    this.renderer = renderer;

    if (this.renderer != null) {
      this.renderer.renderAll(this.board, this.playerX, this.playerY, this.arrowCount, this.moveCount);
    }
  }

  private randomizePlayerPosition() {
    while (true) {
      this.playerX = Math.round(Math.random() * (this.board.length - 1));
      this.playerY = Math.round(Math.random() * (this.board[0].length - 1));

      const playerPlacement = this.board[this.playerX][this.playerY];

      if (!playerPlacement.hasWumpus && !playerPlacement.hasHole && !playerPlacement.hasBat) {
        return;
      }
    }
  }

  movePlayer(direction: string) {
    let newX = this.playerX;
    let newY = this.playerY;
    if (direction === 'North') {
      newY--;
      this.moveCount++;
    } else if (direction === 'East') {
      newX++;
      this.moveCount++;
    } else if (direction === 'South') {
      newY++;
      this.moveCount++;
    } else if (direction === 'West') {
      newX--;
      this.moveCount++;
    } else {
      console.log('Choose either North, East, South or West.');
      return;
    }

    // Makes player loop across board edges
    if (newX === this.board.length) {
      newX = 0;
    } else if (newX === -1) {
      newX = this.board.length - 1;
    }
    if (newY === this.board[0].length) {
      newY = 0;
    } else if (newY === -1) {
      newY = this.board[0].length - 1;
    }
    this.playerX = newX;
    this.playerY = newY;

    if (this.renderer != null) {
      this.renderer.renderAll(this.board, this.playerX, this.playerY, this.arrowCount, this.moveCount);
    }
  }

  wumpusPosition() {
    for (let y = 0; y < this.board[0].length; y++) {
      for (let x = 0; x < this.board.length; x++) {
        if (this.board[x][y].hasWumpus) {
          // console.log(x);
          // console.log(y);
        }
      }
    }
  }

  moveWumpus() {
    for (let y = 0; y < this.board[0].length; y++) {
      for (let x = 0; x < this.board.length; x++) {
        if (this.board[x][y].hasWumpus) {
          let newX = x + 1;
          let newY = y;
          if (newX === this.board.length) {
            newX = 0;
          } else if (newY === this.board[0].length) {
            newY = 0;
          }
          console.log(x);
          console.log(y);
          this.board[x][y].hasWumpus = false;
          this.board[newX][newY].hasWumpus = true;
          return;
        }
      }
    }
  }

  private generateGameboard(width: number, height: number) {
    if (width * height < 20) {
      throw new Error('The gameboard is too small! Choose a bigger one.');
    }

    const board: Room[][] = [];

    for (let x = 0; x < width; x++) {
      const column: Room[] = [];

      for (let y = 0; y < height; y++) {
        const room = new Room(y * width + x + 1);
        if (Math.random() < 0.2) {
          room.hasHole = true;
        } else if (Math.random() < 0.3) {
          room.hasBat = true;
        }

        column.push(room);
      }
      board.push(column);
    }

    // check that there is 2 free boards, for wumpus & player
    let emptyRooms = 0;
    for (let y = 0; y < board[0].length; y++) {
      for (let x = 0; x < board.length; x++) {
        const currentRoom = board[x][y];
        if (!currentRoom.hasHole && !currentRoom.hasBat) {
          emptyRooms++;
        }
      }
    }

    if (emptyRooms < 2) {
      console.log('bad room, trying again!');
      this.generateGameboard(width, height);
      return;
    }

    while (true) {
      const wumpusX = Math.round(Math.random() * (width - 1));
      const wumpusY = Math.round(Math.random() * (height - 1));

      const wumpusPlacement = board[wumpusX][wumpusY];

      if (!wumpusPlacement.hasHole && !wumpusPlacement.hasBat) {
        wumpusPlacement.hasWumpus = true;
        break;
      }
    }

    this.board = board;
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default Game;
