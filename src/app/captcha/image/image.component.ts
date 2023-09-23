import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  imageValidated: boolean | null = null;
  isSubmitted = false;
  nextCaptchaView: string = '';
  @Output()
  clickedNextButton: EventEmitter<string> = new EventEmitter<string>();
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

  imageFormGroup: FormGroup;
  constructor() {
    // Shuffle the imagePaths array randomly
    this.initForm();
    this.shuffleArray(this.imagePaths);
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
    // If the clicked image is already selected, deselect it; otherwise, select the clicked image
    if (this.selectedImage === imagePath) {
        this.selectedImage = null;
        this.imageFormGroup.patchValue({ answer: "" });
    } else {
        this.imageFormGroup.patchValue({ answer: imagePath });
        this.selectedImage = imagePath;
    }
    console.log(this.selectedImage);
}


  answerValidator(form: AbstractControl) {
    const { correctImagePath, answer } = form.value;
    if (correctImagePath === answer) {
      return null; // Valid if the clicked image matches the expected answer
    }
    return { incorrectAnswer: true }; // Invalid if it doesn't match
  }

  selectedImage: string | null = null;

  onSubmit() {
    this.isSubmitted = true;

    if (this.imageFormGroup.valid && !this.imageFormGroup.hasError('math')) {
        this.imageValidated = true;
    } else {
        this.imageValidated = false;
    }

    // Disable the answer input after form submission
    this.imageFormGroup.get('answer').disable();
  }

  retry() {
    this.imageValidated = null;
    this.initForm();
    this.selectedImage = null;
    this.shuffleArray(this.imagePaths);
    this.isSubmitted = false;
    this.imageFormGroup.get('answer').enable()
  }
  onBackClicked() {
    this.nextCaptchaView = 'text';
    this.clickedNextButton.emit(this.nextCaptchaView);
  }
}
