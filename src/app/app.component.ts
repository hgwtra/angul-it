import { Component, OnInit } from '@angular/core';
import { CaptchaStateService } from "./captcha-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  view: 'home' | 'captcha' | 'result';

  constructor(private captchaStateService: CaptchaStateService) {}

  ngOnInit() {
    // Load the current view from the service and set the component's view
    this.captchaStateService.loadStateFromLocalStorage();
    this.view = this.captchaStateService.getCurrentView();
  }

  onBeginButtonClicked(value: string) {
    this.view = value as any; // since the type of `value` is string, we're doing a type assertion here
  }

  handleResultClicked2(value: boolean) {
    this.view = 'result';
  }

  handleRestartButton(value: string) {
    this.view = 'home';
  }
}
