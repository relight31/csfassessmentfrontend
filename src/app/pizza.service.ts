// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type

import { Order } from './models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PizzaService {
  constructor(private http: HttpClient) {}

  // POST /api/order
  // Add any required parameters or return type
  createOrder(order: Order) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return lastValueFrom(this.http.post('/api/order', order, { headers }));
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string) {
    return lastValueFrom(this.http.get('/api/order/' + email + '/all'));
  }
}
