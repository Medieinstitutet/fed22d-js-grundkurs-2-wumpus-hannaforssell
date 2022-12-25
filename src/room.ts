// *********************************************************
// --------------- Creating a class for Room ---------------
// *********************************************************

class Room {
  id: number;

  hasWumpus: boolean;

  hasHole: boolean;

  hasBat: boolean;

  constructor(number: number) {
    this.id = number;
    this.hasWumpus = false;
    this.hasHole = false;
    this.hasBat = false;
  }
}

export default Room;
