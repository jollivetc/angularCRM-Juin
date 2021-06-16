import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  names = ['Bob', 'John'];
  classToApply = 'aclass'

  clicked($event:MouseEvent):void{
    console.log($event)
  }
}
