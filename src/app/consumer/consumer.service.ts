import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private httpClient: HttpClient) { }

  getAllConsumers():Observable<Consumer[]> {
    return this.httpClient.get<Consumer[]>('api/consumers');
  }
}
