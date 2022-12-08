// *********************************************************
// ---------------------- Imports --------------------------
// *********************************************************

import Room from './room';

// *********************************************************
// --------------- Generating the gameboard ----------------
// *********************************************************

function generateGameboard(width: number, height: number): Room[][] {
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

  while (true) {
    const wumpusX = Math.round(Math.random() * (width - 1));
    const wumpusY = Math.round(Math.random() * (height - 1));

    const wumpusPlacement = board[wumpusX][wumpusY];

    if (!wumpusPlacement.hasHole && !wumpusPlacement.hasBat) {
      wumpusPlacement.hasWumpus = true;
      break;
    }
  }
  return board;
}

// *********************************************************
// -------------- Creating a class for Game ----------------
// *********************************************************

class Game {
  arrowCount: number;

  moveCount: number;

  board: Room[][];

  playerX: number;

  playerY: number;

  constructor() {
    this.arrowCount = 5;
    this.moveCount = 0;
    this.board = generateGameboard(5, 4);
    this.playerX = this.playerPositionX();
    this.playerY = this.playerPositionY();
  }

  playerPositionX() {
    let xPos = this.playerX;
    xPos = Math.round(Math.random() * (this.board.length - 1));
    return xPos;
  }

  playerPositionY() {
    let yPos = this.playerY;
    yPos = Math.round(Math.random() * (this.board[0].length - 1));
    return yPos;
  }

  movePlayer(direction: string) {
    let newX = this.playerX;
    let newY = this.playerY;
    if (direction === 'North') {
      newY -= 1;
      this.moveCount += 1;
    } else if (direction === 'East') {
      newX += 1;
      this.moveCount += 1;
    } else if (direction === 'South') {
      newY += 1;
      this.moveCount += 1;
    } else if (direction === 'West') {
      newX -= 1;
      this.moveCount += 1;
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
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default Game;
