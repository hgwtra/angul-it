import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CaptchaStateService} from "../../captcha-state.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

  imageValidated: boolean | null = null;
  isSubmitted = false;
  nextCaptchaView: string = '';

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
  constructor(private captchaStateService: CaptchaStateService) {
    // Shuffle the imagePaths array randomly
    this.initForm();
    this.shuffleArray(this.imagePaths);
  }

  onCaptcha3Success() {
    this.captchaStateService.setCaptcha3Passed(true);
  }

  isCaptcha3Passed() {
    return this.captchaStateService.isCaptcha3Passed();
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
        if (this.imageValidated) {
          this.onCaptcha3Success();
        //console.log("Captcha 3 passed:" + this.captchaStateService.isCaptcha3Passed());
      }
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

  @Output()
  clickedNextButton: EventEmitter<string> = new EventEmitter<string>();
  onBackClicked() {
    this.nextCaptchaView = 'text';
    this.clickedNextButton.emit(this.nextCaptchaView);
  }

  @Output() ResultClicked = new EventEmitter<boolean>();
  resultIsClicked: boolean = false;
  onResultClicked() {
    this.resultIsClicked = true;
    this.ResultClicked.emit(this.resultIsClicked);
  }
}
