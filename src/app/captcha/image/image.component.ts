import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  imagePaths: string[] = [
    "./assets/images/answer.jpg",
    "./assets/images/image2.jpg",
    "./assets/images/image3.jpg",
    "./assets/images/image4.jpg",
    "./assets/images/image5.jpg",
    "./assets/images/image6.jpg",
    "./assets/images/image7.jpg",
    "./assets/images/image8.jpg",
    "./assets/images/image9.jpg",
  ];

  correctImagePath: string = "./assets/images/answer.jpg";
  clickedImagePath: string ="";

  imageFormGroup: FormGroup;
  constructor() {
    // Shuffle the imagePaths array randomly
    this.initForm();
    //this.shuffleArray(this.imagePaths);
  }

  // Function to shuffle an array randomly
  private shuffleArray(array: any[]) {
    let currentIndex = array.length, randomIndex, temporaryValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  initForm() {
    this.imageFormGroup = new FormGroup(
      {
        correctImagePath: new FormControl(this.correctImagePath, [
          Validators.required
        ]),
        answer: new FormControl("")
      },

      [this.answerValidator] // Bind the validator to the component instance
    );
  }
  onImageClicked(imagePath: string) {
    this.clickedImagePath = imagePath;
    console.log(imagePath);
  }

  answerValidator(form: AbstractControl) {
    const { correctImagePath, answer } = form.value;
    if (correctImagePath === answer) {
      return null; // Valid if the clicked image matches the expected answer
    }
    return { incorrectAnswer: true }; // Invalid if it doesn't match
  }

}
