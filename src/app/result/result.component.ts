import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {CaptchaStateService} from "../captcha-state.service";


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{

  ngOnInit(): void {
    this.captchaStateService.setCurrentView('result');
    this.captchaStateService.saveStateToLocalStorage();
    this.captchaStateService.loadStateFromLocalStorage();
  }

  constructor(private captchaStateService: CaptchaStateService) {
    
  }
  // new event emitter for begin clicked button
  @Output()
  clickedRestartButton: EventEmitter<string> = new EventEmitter<string>();

  clickedRestart: string = 'home';

  onRestart(){
    this.clickedRestartButton.emit(this.clickedRestart);
    this.captchaStateService.saveStateToLocalStorage();
    this.captchaStateService.clearLocalStorage();
  }
}
