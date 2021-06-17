import { Component, OnInit } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { map, take } from 'rxjs/operators'
@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phoneNumber='0123456789';

  constructor(private demoObservableService: DemoObservableService) { }

  ngOnInit(): void {
  }

  testObservable(){
    this.demoObservableService.test()
        .pipe(
          map(value=>value*10),
          take(2)
        )
        .subscribe(
          (result)=>{console.log(`received ${result}`)},
          (error)=>{console.error(error)},
          ()=>{console.log('complete')}
        );
  }

}
