import { Injectable } from '@angular/core';


export interface AppState {
  view: 'home' | 'captcha' | 'result' ;
  captchaView:  'math' | 'text' | 'image' ;
  captchaStatus: {
    captcha1: boolean;
    captcha2: boolean;
    captcha3: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})

export class CaptchaStateService {

  constructor() {
    this.loadStateFromLocalStorage();
  }
  
  private captcha1Passed: boolean = false;
  private captcha2Passed: boolean = false;
  private captcha3Passed: boolean = false;

  setCaptcha1Passed(value: boolean) {
    this.captcha1Passed = value;
  }

  isCaptcha1Passed() {
    return this.captcha1Passed;
  }

  setCaptcha2Passed(value: boolean) {
    this.captcha2Passed = value;
  }

  isCaptcha2Passed() {
    return this.captcha2Passed;
  }

  setCaptcha3Passed(value: boolean) {
    this.captcha3Passed = value;
  }

  isCaptcha3Passed() {
    return this.captcha3Passed;
  }

  private currentView: 'home' | 'captcha' | 'result';
  private currentCaptchaView: 'math' | 'text' | 'image';

  setCurrentView(view: 'home' | 'captcha' | 'result' ) {
    this.currentView = view;
  }

  setCurrentCaptchaView(captchaView: 'math' | 'text' | 'image') {
    this.currentCaptchaView = captchaView;
  }

  getCurrentView(): 'home' | 'captcha' | 'result' {
    return this.currentView;
  }

  getCurrentCaptchaView():'math' | 'text' | 'image' {
    return this.currentCaptchaView;
  }

  saveStateToLocalStorage() {
    const state: AppState = {
      view: this.currentView,
      captchaView: this.currentCaptchaView, 
      captchaStatus: {
          captcha1: this.captcha1Passed,
          captcha2: this.captcha2Passed,
          captcha3: this.captcha3Passed
      }
    };
    localStorage.setItem('captchaState', JSON.stringify(state));
}


  // This method will load the state from localStorage
  loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('captchaState');  // Use 'captchaState' consistently
    if (savedState) {
      const parsedState: AppState = JSON.parse(savedState);
      this.currentView = parsedState.view || 'home'; // default to 'home' if no view is stored
      this.currentCaptchaView = parsedState.captchaView || 'math'; // default to 'math' if no view is stored
      this.captcha1Passed = parsedState.captchaStatus.captcha1 || false;
      this.captcha2Passed = parsedState.captchaStatus.captcha2 || false;
      this.captcha3Passed = parsedState.captchaStatus.captcha3 || false;
    }
  }

  // This method can be used to initialize or update the service's state from loaded AppState
  initializeFromState(state: AppState) {
    if (state && state.captchaStatus) {
      this.captcha1Passed = state.captchaStatus.captcha1;
      this.captcha2Passed = state.captchaStatus.captcha2;
      this.captcha3Passed = state.captchaStatus.captcha3;
    }
  }

  clearLocalStorage() {
    localStorage.clear();
    this.captcha1Passed = false;
    this.captcha2Passed = false;
    this.captcha3Passed = false;
  }
}
