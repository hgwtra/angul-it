import {Component, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  textValidated: boolean | null = null;  // true = correct, false = incorrect, null = not yet validated
  isSubmitted = false;
  nextCaptchaView: string = '';
  backCaptchaView: string = 'math';
  @Output()
  clickedNextButton: EventEmitter<string> = new EventEmitter<string>();

  //Canvas
  @ViewChild('canvas') canvas: ElementRef;

  textFormGroup: FormGroup;
  constructor() {
    this.initForm();
  }
  randomAlphaNumeric = (n: number): string => {
    // Choose characters randomly from this string
    const alphaNumericString =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "0123456789" +
      "abcdefghijklmnopqrstuvwxyz";

    // Create a StringBuilder of size n
    const sb: string[] = [];

    for (let i = 0; i < n; i++) {
      // Generate a random number between 0 and the length of alphaNumericString
      const index = Math.floor(Math.random() * alphaNumericString.length);

      // Add the character at the random index to the end of sb
      sb.push(alphaNumericString.charAt(index));
    }

    return sb.join("");
  };
  initForm() {
    this.textFormGroup = new FormGroup(
      {
        randomAlphanumericText: new FormControl(this.randomAlphaNumeric(8), [
          Validators.required
        ]),
        answer: new FormControl("")
      },
      [this.answerValidator]
    );
  }


  answerValidator(form: AbstractControl) {
    console.log(form.value);
    const { randomAlphanumericText, answer } = form.value;
    if (answer === randomAlphanumericText) {
      return null;
    }
    return { math: true };
  }

  preventEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  ngAfterViewInit() {
    this.drawText();
  }

  drawText() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    ctx.font = '35px QuickSand';

    const text = this.textFormGroup.get('randomAlphanumericText').value;
    const startX = 20;  // Initial x-coordinate
    let currentX = startX;  // Current x-coordinate

    // Draw the text with the sine wave effect
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const offsetY = 10 * Math.sin(i);
        const y = 40 + offsetY;
        ctx.fillText(char, currentX, y);
        currentX += ctx.measureText(char).width;
    }

    // Draw random lines
    const numLines = 5;  // Number of random lines to draw
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const startX = this.getRandomInt(0, this.canvas.nativeElement.width);
        const startY = this.getRandomInt(0, this.canvas.nativeElement.height);
        const endX = this.getRandomInt(0, this.canvas.nativeElement.width);
        const endY = this.getRandomInt(0, this.canvas.nativeElement.height);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "#D3D3D3";  // Line color
        ctx.lineWidth = 1;  // Line width
        ctx.stroke();
    }
}

  // Helper function to get a random integer between min and max
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.textFormGroup.valid && !this.textFormGroup.hasError('math')) {
        this.textValidated = true;
    } else {
        this.textValidated = false;
    }

    // Disable the answer input after form submission
    this.textFormGroup.get('answer').disable();
  }


  onRefreshButtonClicked() {
    this.initForm();
    this.drawText();
    this.textFormGroup.get('answer').enable(); // make sure the control is re-enabled here
  }

  retry() {
    this.textValidated = null;
    this.onRefreshButtonClicked();
    this.isSubmitted = false;
    this.textFormGroup.get('answer').enable()
  }


  onNextClicked() {
    this.nextCaptchaView = 'image';
    this.clickedNextButton.emit(this.nextCaptchaView);
  }

  onBackClicked() {
    this.nextCaptchaView = 'math';
    this.clickedNextButton.emit(this.nextCaptchaView);
  }

}
