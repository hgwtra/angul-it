import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  // new event emitter for begin clicked button
  @Output()
  clickedRestartButton: EventEmitter<string> = new EventEmitter<string>();

  clickedRestart: string = 'home';

  onRestart(){
    this.clickedRestartButton.emit(this.clickedRestart);
  }
}
