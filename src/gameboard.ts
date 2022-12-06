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
    this.playerX = 3;
    this.playerY = 2;
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default Game;
