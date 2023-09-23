import { Component } from '@angular/core';

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

  constructor() {
    // Shuffle the imagePaths array randomly
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

  onImageClicked(imagePath: string) {
    console.log(imagePath);
  }
}
