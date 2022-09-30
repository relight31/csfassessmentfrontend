import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  email!: string;
  orders!: Order[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pizzaSvc: PizzaService
  ) {}

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email'];
    this.getOrders();
  }

  getOrders() {
    this.orders = [];
    this.pizzaSvc
      .getOrders(this.email)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    // populate orders here
  }
}
