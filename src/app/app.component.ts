import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view: string = 'home';


  onBeginButtonClicked(value: string){
    this.view = value;
    console.log(value);
  }

  handleResultClicked2(value: boolean) {
    this.view = 'result';
    //console.log("here");
  }

  handleRestartButton(value: string) {
    this.view = 'home';
    //console.log("here");
  }
}
