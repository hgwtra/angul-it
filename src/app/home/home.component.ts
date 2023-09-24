import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {CaptchaStateService} from "../captcha-state.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.captchaStateService.setCurrentView('home');
    this.captchaStateService.setCurrentCaptchaView('math');
    this.captchaStateService.saveStateToLocalStorage();
    this.captchaStateService.loadStateFromLocalStorage();
  }
  

  constructor(private captchaStateService: CaptchaStateService) {
    
  }

  @Output()
  clickedBeginButton: EventEmitter<string> = new EventEmitter<string>();

  onBegin() {
    this.clickedBeginButton.emit('captcha');
    this.captchaStateService.setCurrentView('captcha');
    this.captchaStateService.saveStateToLocalStorage();
  }
}
