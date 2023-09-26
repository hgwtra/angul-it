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
    const jsonString = JSON.stringify(state);
    const base64String = btoa(jsonString); // Encode as Base64
    localStorage.setItem('captchaState', base64String);
}


// Load the state from localStorage
loadStateFromLocalStorage() {
  // Default values
  this.currentView = 'home';
  this.currentCaptchaView = 'math';
  this.captcha1Passed = false;
  this.captcha2Passed = false;
  this.captcha3Passed = false;

  const savedBase64State = localStorage.getItem('captchaState'); // Get the Base64-encoded state
  if (savedBase64State) {
    // Decode the Base64 string
    const jsonString = atob(savedBase64State);

    // Parse the JSON string
    const parsedState: AppState = JSON.parse(jsonString);

    // Overwrite defaults with loaded values if they exist
    if (parsedState.view) this.currentView = parsedState.view;
    if (parsedState.captchaView) this.currentCaptchaView = parsedState.captchaView;
    if (parsedState.captchaStatus) {
      if (parsedState.captchaStatus.captcha1 !== undefined) this.captcha1Passed = parsedState.captchaStatus.captcha1;
      if (parsedState.captchaStatus.captcha2 !== undefined) this.captcha2Passed = parsedState.captchaStatus.captcha2;
      if (parsedState.captchaStatus.captcha3 !== undefined) this.captcha3Passed = parsedState.captchaStatus.captcha3;
    }
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
