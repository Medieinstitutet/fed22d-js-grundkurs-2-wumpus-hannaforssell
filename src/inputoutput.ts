// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import Action from './action';
import Direction from './direction';

// *********************************************************
// --------------- Creating InputOutput class -----------------
// *********************************************************

class InputOutput {
  input: HTMLInputElement;

  output: HTMLElement;

  private static regexNorth = /^(north|n)$/i;

  private static regexEast = /^(east|e)$/i;

  private static regexSouth = /^(south|s)$/i;

  private static regexWest = /^(west|w)$/i;

  private static regexMove = /^(move|m)$/i;

  private static regexShoot = /^(shoot|s)$/i;

  private static regexRestart = /^restart ?([\d]*) ?([\d]*)$/i;

  private static regexCheat = /^cheat$/i;

  constructor(inputId: string, outputId: string) {
    this.input = document.querySelector(inputId) as HTMLInputElement;
    this.output = document.querySelector(outputId) as HTMLElement;
  }

  writeLine(line: string) {
    this.output.innerHTML += `${line}\n`;
    this.output.scrollTop = this.output.scrollHeight;
  }

  inputLine(): string {
    const inputText = this.input.value;

    if (inputText === '') {
      return '';
    }

    this.writeLine(`> ${inputText}`);

    this.input.value = '';

    return inputText;
  }

  disableInput() {
    this.input.disabled = true;
  }

  static parseDirection(direction: string): Direction {
    if (this.regexNorth.test(direction)) {
      return Direction.North;
    }
    if (this.regexEast.test(direction)) {
      return Direction.East;
    }
    if (this.regexSouth.test(direction)) {
      return Direction.South;
    }
    if (this.regexWest.test(direction)) {
      return Direction.West;
    }
    return Direction.Unknown;
  }

  static parseAction(action: string): Action {
    if (this.regexMove.test(action)) {
      return Action.Move;
    }
    if (this.regexShoot.test(action)) {
      return Action.Shoot;
    }
    return Action.Unknown;
  }

  static isRestart(restart: string): [boolean, number, number] {
    const match = this.regexRestart.exec(restart);
    if (match === null) {
      return [false, 0, 0];
    }

    const restartWidth = Number(match[1]);
    const restartHeight = Number(match[2]);

    if (restartWidth === 0 || restartHeight === 0) {
      return [true, 0, 0];
    }

    return [true, restartWidth, restartHeight];
  }

  static isCheat(cheat: string): boolean {
    return this.regexCheat.test(cheat);
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default InputOutput;
