import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angul';

  view: string = '';


  onBeginButtonClicked(value: string){
    this.view = value;
    console.log(value);
  }
}
