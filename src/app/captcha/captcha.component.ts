import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})

export class CaptchaComponent {
  captchaView: string = 'math';

  onNextClicked(value: string){
    this.captchaView = value;
    //console.log(value);
  }


  @Output() resultClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  isResultClicked: boolean = false;

  handleResultClicked(value: boolean) {
    this.isResultClicked = value;
    this.resultClicked.emit(this.isResultClicked);
    //console.log(value);
  }

}

