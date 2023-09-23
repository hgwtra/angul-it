import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
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
}
