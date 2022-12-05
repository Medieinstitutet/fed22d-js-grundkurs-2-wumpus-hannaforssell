class Room {
  id: number;

  hasWumpus: boolean;

  hasHole: boolean;

  constructor() {
    this.id = Math.round(Math.random() * 11);
    this.hasWumpus = false;
    this.hasHole = false;
  }
}

function generateGameboard(x: number, y: number): Room[][] {
  const board: Room[][] = [];

  for (let i = 0; i < x; i++) {
    const column: Room[] = [];

    for (let j = 0; j < y; j++) {
      const room: Room = new Room();
      column.push(room);
    }
    board.push(column);
  }

  const wumpusX = Math.round(Math.random() * x);
  const wumpusY = Math.round(Math.random() * y);

  board[wumpusX][wumpusY].hasWumpus = true;

  return board;
}

export default generateGameboard;
