import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  @Input()
  label?:string;

  @Output()
  save: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  clicked($event:MouseEvent):void {
    this.save.emit(this.label + 'a random string')
  }

}
