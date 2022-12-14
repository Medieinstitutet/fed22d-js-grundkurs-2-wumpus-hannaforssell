// *********************************************************
// ---------------------- Imports --------------------------
// *********************************************************

import Room from './room';
import Renderer from './renderer';
import InputOutput from './inputoutput';

// *********************************************************
// -------------- Creating a class for Game ----------------
// *********************************************************

class Game {
  arrowCount: number;

  arrowMoveCount = 0;

  moveCount: number;

  board: Room[][] = [];

  playerX = 0;

  playerY = 0;

  arrowX = -1;

  arrowY = -1;

  state = 'Choose';

  inputOutput: InputOutput;

  renderer: Renderer | null;

  constructor(width: number, height: number, inputOutput: InputOutput, renderer: Renderer | null = null) {
    this.arrowCount = 5;
    this.moveCount = 0;

    this.generateGameboard(width, height);
    this.randomizePlayerPosition();

    this.inputOutput = inputOutput;
    this.inputOutput.input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.gameLoop();
      }
    });

    // Welcome-message
    this.inputOutput.writeLine('Lets find Wumpus before he finds you!');

    this.initRoom();

    this.renderer = renderer;

    this.renderAll();
  }

  renderAll() {
    if (this.renderer != null) {
      this.renderer.renderAll(
        this.board,
        this.playerX,
        this.playerY,
        this.arrowX,
        this.arrowY,
        this.arrowCount,
        this.moveCount,
      );
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

  move(entity: string, direction: string) {
    let newX;
    let newY;
    if (entity === 'player' || this.arrowX === -1) {
      newX = this.playerX;
      newY = this.playerY;
    } else if (entity === 'arrow') {
      newX = this.arrowX;
      newY = this.arrowY;
    } else {
      return;
    }

    // input whole word or first letter, case-insensitive
    const regexNorth = /^north|n$/i;
    const regexEast = /^east|e$/i;
    const regexSouth = /^south|s$/i;
    const regexWest = /^west|w$/i;

    if (regexNorth.test(direction)) {
      newY--;
      if (entity === 'player') {
        this.moveCount++;
      }
    } else if (regexEast.test(direction)) {
      newX++;
      if (entity === 'player') {
        this.moveCount++;
      }
    } else if (regexSouth.test(direction)) {
      newY++;
      if (entity === 'player') {
        this.moveCount++;
      }
    } else if (regexWest.test(direction)) {
      newX--;
      if (entity === 'player') {
        this.moveCount++;
      }
    } else {
      this.inputOutput.writeLine('Choose either North, East, South or West.');
      return;
    }

    // Makes player loop across board edges
    if (newX === this.board.length) {
      newX = 0;
    }
    if (newX === -1) {
      newX = this.board.length - 1;
    }
    if (newY === this.board[0].length) {
      newY = 0;
    }
    if (newY === -1) {
      newY = this.board[0].length - 1;
    }

    if (entity === 'player') {
      this.playerX = newX;
      this.playerY = newY;
    } else if (entity === 'arrow') {
      this.arrowX = newX;
      this.arrowY = newY;
    }

    // FIX!! should not be activated when arrow moves

    this.triggerEvents();

    this.renderAll();
  }

  triggerEvents() {
    const playerPlacement = this.board[this.playerX][this.playerY];

    if (playerPlacement.hasWumpus) {
      this.inputOutput.writeLine('Wumpus killed you..');
      this.loseGame();
    }

    if (playerPlacement.hasHole) {
      this.inputOutput.writeLine('You fell into a hole..');
      this.loseGame();
    }

    // add which room you land in
    if (playerPlacement.hasBat) {
      this.randomizePlayerPosition();
      this.inputOutput.writeLine('You walked right into the bats! They flew away with you.');
      this.loseGame();
    }

    if (this.playerX === this.arrowX && this.playerY === this.arrowY) {
      this.inputOutput.writeLine('You (hopefully) accidentally shot yourself..');
      this.loseGame();
    }

    if (this.arrowX !== -1 && this.arrowY !== -1) {
      const arrowPlacement = this.board[this.arrowX][this.arrowY];
      if (arrowPlacement.hasWumpus) {
        this.winGame();
      }
    }
  }

  adjacentRooms() {
    let northY = this.playerY - 1;
    let eastX = this.playerX + 1;
    let southY = this.playerY + 1;
    let westX = this.playerX - 1;

    if (eastX === this.board.length) {
      eastX = 0;
    }
    if (westX === -1) {
      westX = this.board.length - 1;
    }
    if (southY === this.board[0].length) {
      southY = 0;
    }
    if (northY === -1) {
      northY = this.board[0].length - 1;
    }

    const northRoom = this.board[this.playerX][northY];
    const eastRoom = this.board[eastX][this.playerY];
    const southRoom = this.board[this.playerX][southY];
    const westRoom = this.board[westX][this.playerY];

    return [northRoom, eastRoom, southRoom, westRoom];
  }

  initRoom() {
    let foundWumpus = false;
    let foundHole = false;
    let foundBat = false;

    const rooms = [];
    for (const room of this.adjacentRooms()) {
      rooms.push(` ${room.id}`);

      if (room.hasWumpus) {
        foundWumpus = true;
      }
      if (room.hasHole) {
        foundHole = true;
      }
      if (room.hasBat) {
        foundBat = true;
      }
    }

    if (foundWumpus) {
      this.inputOutput.writeLine('You smell of Wumpus!');
    }
    if (foundHole) {
      this.inputOutput.writeLine('You sense the smell of sewage..');
    }
    if (foundBat) {
      this.inputOutput.writeLine('You feel the wind coming from wingtips..');
    }

    this.inputOutput.writeLine(`You can go to rooms${rooms.toString()}.`);
    this.inputOutput.writeLine('Would you like to move or shoot? (M, S)');
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

    if (Game.emptyRooms(board) < 2) {
      this.generateGameboard(width, height);
      return;
    }

    Game.randomizeWumpusPosition(board);

    this.board = board;
  }

  // will fix upper/lowercase
  // only five arrows!
  gameLoop() {
    this.renderAll();

    const regexMove = /^move|m$/i;
    const regexShoot = /^shoot|s$/i;
    const regexNorth = /^north|n$/i;
    const regexEast = /^east|e$/i;
    const regexSouth = /^south|s$/i;
    const regexWest = /^west|w$/i;

    if (this.state === 'Choose') {
      const inputText = this.inputOutput.inputLine();

      if (regexMove.test(inputText)) {
        this.state = 'Move';
        this.inputOutput.writeLine('In which direction would you like to go? (N, E, S, W)');
      } else if (regexShoot.test(inputText)) {
        this.state = 'Shoot';
        this.inputOutput.writeLine('In which direction would you like to shoot? (N, E, S, W)');
        this.arrowCount--;
      } else {
        this.inputOutput.writeLine('Would you like to move or shoot? (M, S)');
      }
    } else if (this.state === 'Move') {
      const inputText = this.inputOutput.inputLine();

      if (regexNorth.test(inputText)
        || regexEast.test(inputText)
        || regexSouth.test(inputText)
        || regexWest.test(inputText)) {
        this.move('player', inputText);
        this.initRoom();
      } else {
        this.inputOutput.writeLine('In which direction would you like to go? (N, E, S, W)');
      }
    } else if (this.state === 'Shoot') {
      const inputText = this.inputOutput.inputLine();

      if (regexNorth.test(inputText)
      || regexEast.test(inputText)
      || regexSouth.test(inputText)
      || regexWest.test(inputText)) {
        this.move('arrow', inputText);
        this.arrowMoveCount++;

        // fix another argument instead of disabled

        if (this.arrowMoveCount === 3 && this.inputOutput.input.disabled === false) {
          this.state = 'Choose';
          this.arrowX = -1;
          this.arrowY = -1;
          this.inputOutput.writeLine('Would you like to move or shoot? (M, S)');
        }
      } else {
        this.inputOutput.writeLine('In which direction would you like to shoot? (N, E, S, W)');
      }
    }
  }

  winGame() {
    this.state = 'Won';
    this.inputOutput.writeLine('You have won!');
    this.inputOutput.writeLine(`You defeated Wumpus after only ${this.moveCount} moves!`);
    this.inputOutput.disableInput();
  }

  loseGame() {
    this.inputOutput.writeLine('You have lost the game..');
    this.inputOutput.disableInput();
  }

  private static randomizeWumpusPosition(board: Room[][]) {
    while (true) {
      const wumpusX = Math.round(Math.random() * (board.length - 1));
      const wumpusY = Math.round(Math.random() * (board[0].length - 1));

      const wumpusPlacement = board[wumpusX][wumpusY];

      if (!wumpusPlacement.hasHole && !wumpusPlacement.hasBat) {
        wumpusPlacement.hasWumpus = true;
        break;
      }
    }
  }

  private static emptyRooms(board: Room[][]): number {
    let emptyRooms = 0;
    for (let y = 0; y < board[0].length; y++) {
      for (let x = 0; x < board.length; x++) {
        const currentRoom = board[x][y];
        if (!currentRoom.hasHole && !currentRoom.hasBat) {
          emptyRooms++;
        }
      }
    }
    return emptyRooms;
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default Game;
