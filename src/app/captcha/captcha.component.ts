import { Component } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})

export class CaptchaComponent {
  captchaView: string = 'math';

  onNextClicked(value: string){
    this.captchaView = value;
    console.log(value);
  }
}
