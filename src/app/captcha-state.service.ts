import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {
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
}
