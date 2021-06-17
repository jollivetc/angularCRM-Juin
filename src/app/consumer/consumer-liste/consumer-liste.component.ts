import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-liste',
  templateUrl: './consumer-liste.component.html',
  styleUrls: ['./consumer-liste.component.scss']
})
export class ConsumerListeComponent implements OnInit {

  consumerList?:Consumer[];

  constructor(private consumerService: ConsumerService) { }

  ngOnInit(): void {
    this.consumerService.getAllConsumers()
      .subscribe(
        (result)=>{this.consumerList = result},
        (error)=>{console.error(error)},
        ()=>{}
      )
  }

}
