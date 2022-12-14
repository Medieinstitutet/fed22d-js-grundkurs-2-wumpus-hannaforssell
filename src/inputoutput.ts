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
}

// *********************************************************
// ------------------------ Exports ------------------------
// *********************************************************

export default InputOutput;
