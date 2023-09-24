import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CaptchaStateService } from '../captcha-state.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})

export class CaptchaComponent implements OnInit {

  ngOnInit(): void {
    this.captchaStateService.loadStateFromLocalStorage();
    this.captchaView = this.captchaStateService.getCurrentCaptchaView();
  }

  captchaView: string = 'math';

  constructor(private captchaStateService: CaptchaStateService) {}

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

