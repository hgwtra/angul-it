import { Component} from '@angular/core';
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
  mathFormGroup: FormGroup;
  constructor() {
    this.initForm();
  }
  randomNumber = (min = 1, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  initForm() {
    this.mathFormGroup = new FormGroup(
      {
        firstNumber: new FormControl({ value: this.randomNumber(), disabled: true }, [
          Validators.required
        ]),
        secondNumber: new FormControl({ value: this.randomNumber(), disabled: true }, [
          Validators.required
        ]),
        answer: new FormControl("")
      },
      [this.answerValidator]
    );
  }
  answerValidator(form: AbstractControl) {
    console.log( form.value);
    const { firstNumber, secondNumber, answer } = form.value;
    if (+answer === parseInt(firstNumber) + parseInt(secondNumber)) {
      return null;
    }
    return { math: true };
  }
}