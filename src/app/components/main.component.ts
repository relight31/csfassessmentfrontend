import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  'Personal - 6 inches',
  'Regular - 9 inches',
  'Large - 12 inches',
  'Extra Large - 15 inches',
];

const PizzaToppings: string[] = [
  'chicken',
  'seafood',
  'beef',
  'vegetables',
  'cheese',
  'arugula',
  'pineapple',
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  pizzaSize = SIZES[0];
  form!: FormGroup;
  toppings!: FormArray;

  @ViewChild('email')
  email!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pizzaSvc: PizzaService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)];
  }
  createTopping(topping: string) {
    return this.fb.group({
      name: this.fb.control(topping),
      selected: this.fb.control(false, [Validators.required]),
    });
  }
  createForm() {
    this.toppings = this.fb.array(
      PizzaToppings.map((i) => this.createTopping(i))
    );
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [(Validators.required, Validators.email)]),
      size: this.fb.control(0, [Validators.required]),
      base: this.fb.control('thin', [Validators.required]),
      sauce: this.fb.control('', [Validators.required]),
      toppingsChicken: this.fb.control(false),
      toppingsSeafood: this.fb.control(false),
      toppingsBeef: this.fb.control(false),
      toppingsVegetables: this.fb.control(false),
      toppingsCheese: this.fb.control(false),
      toppingsArugula: this.fb.control(false),
      toppingsPineapple: this.fb.control(false),
      comments: this.fb.control(''),
    });
  }
  cleanOrderTemp(order: Order) {
    order.toppings = '';
    if (order.toppingsChicken) {
      order.toppings.concat("chicken");
    }
    if (order.toppingsSeafood) {
      order.toppings.concat('seafood');
    }
    if (order.toppingsBeef) {
      order.toppings.concat('beef');
    }
    if (order.toppingsVegetables) {
      order.toppings.concat('vegetables');
    }
    if (order.toppingsCheese) {
      order.toppings.concat('cheese');
    }
    if (order.toppingsArugula) {
      order.toppings.concat('arugula');
    }
    if (order.toppingsPineapple) {
      order.toppings.concat('pineapple');
    }
    return order;
  }
  submitTemp() {
    console.log('submitting form');
    let order: Order = this.form.value as Order;
    order = this.cleanOrderTemp(order);
    console.log(order);
    this.pizzaSvc
      .createOrder(order)
      .then((result) => {
        console.log('>>>>> Order submitted to backend');
        console.log(result);
      })
      .catch((error) => {
        console.error('>>>>> Insert order failed');
        console.error(error);
      });
    this.router.navigate(['/orders', order.email]);
  }

  viewOrders() {
    const email = this.email.nativeElement.value;
    this.router.navigate(['/orders', email]);
  }
}
