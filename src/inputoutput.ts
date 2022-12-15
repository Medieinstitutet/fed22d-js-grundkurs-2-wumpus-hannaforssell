// *********************************************************
// ------------------------ Imports ------------------------
// *********************************************************

import Direction from './direction';

// *********************************************************
// --------------- Creating InputOutput class -----------------
// *********************************************************

class InputOutput {
  input: HTMLInputElement;

  output: HTMLElement;

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

    this.writeLine(`> ${inputText}`);

    this.input.value = '';

    return inputText;
  }

  disableInput() {
    this.input.disabled = true;
  }

  static parseDirection(direction: string): Direction {
    const regexNorth = /^north|n$/i;
    const regexEast = /^east|e$/i;
    const regexSouth = /^south|s$/i;
    const regexWest = /^west|w$/i;

    if (regexNorth.test(direction)) {
      return Direction.North;
    }
    if (regexEast.test(direction)) {
      return Direction.East;
    }
    if (regexSouth.test(direction)) {
      return Direction.South;
    }
    if (regexWest.test(direction)) {
      return Direction.West;
    }
    return Direction.Unknown;
  }
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default InputOutput;
