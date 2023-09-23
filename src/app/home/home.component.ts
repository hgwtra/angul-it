import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // new event emitter for begin clicked button
  @Output()
  clickedBeginButton: EventEmitter<string> = new EventEmitter<string>();

  clickedBegin: string = 'captcha';

  onBegin(){
    this.clickedBeginButton.emit(this.clickedBegin);
  }
}
