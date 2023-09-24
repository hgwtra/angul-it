import { Component, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.css'],
})

export class MathComponent  {
  //Canvas
  @ViewChild('canvas') canvas: ElementRef;

  mathValidated: boolean | null = null;  // true = correct, false = incorrect, null = not yet validated
  isSubmitted = false;
  mathFormGroup: FormGroup;
  captchaView: string = 'math';


  //Form validation
  constructor() {
    this.initForm();
  }

  //randomize a number
  randomNumber = (min = 1, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  operators = ["+", "-", "*"];

  randomOperator = () => { return this.operators[Math.floor(Math.random() * this.operators.length)]; };

  initForm() {
    this.mathFormGroup = new FormGroup(
      {
        firstNumber: new FormControl(this.randomNumber(), [
          Validators.required
        ]),
        secondNumber: new FormControl(this.randomNumber(), [
          Validators.required
        ]),
        operator: new FormControl(this.randomOperator(), [
          Validators.required
        ]),
        answer: new FormControl("", [
          //Validators.maxLength(6)
        ])
      },
      [this.answerValidator]
    );
  }

  answerValidator(form: AbstractControl) {
    const { firstNumber, secondNumber, operator, answer } = form.value;

    let result;
    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        default:
            return { math: true }; // return an error if the operator is not recognized
    }

    if (+answer === result) {
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
    this.drawEquation();
  }

  drawEquation() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    ctx.font = '35px QuickSand';
    ctx.fillText(`${this.mathFormGroup.get('firstNumber').value} ${this.mathFormGroup.get('operator').value} ${this.mathFormGroup.get('secondNumber').value}`, 10, 30);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.mathFormGroup.valid && (!this.mathFormGroup.errors || !this.mathFormGroup.errors['math'])) {
      this.mathValidated = true;
      this.mathFormGroup.get('answer').disable();
    } else if (this.mathFormGroup.errors && this.mathFormGroup.errors['math']) {
      this.mathValidated = false;
      this.mathFormGroup.get('answer').disable();
    }
  }

  retry() {
    this.mathValidated = null;
    this.onRefreshButtonClicked();
    this.isSubmitted = false;
    this.mathFormGroup.get('answer').enable()
  }

  onRefreshButtonClicked() {
    this.mathValidated = null;
    this.isSubmitted = false;
    this.initForm();
    this.drawEquation();
    this.mathFormGroup.get('answer').enable(); // make sure the control is re-enabled here
  }

  @Output()
  clickedNextButton: EventEmitter<string> = new EventEmitter<string>();
  onNextClicked() {
    this.captchaView = 'text';
    this.clickedNextButton.emit(this.captchaView);
  }
}
