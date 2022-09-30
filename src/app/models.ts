// Add your models here if you have any
export interface Order {
  id: string;
  name: string;
  email: string;
  size: number;
  base: string;
  sauce: string;
  toppingsChicken: boolean;
  toppingsSeafood: string;
  toppingsBeef: string;
  toppingsVegetables: string;
  toppingsCheese: string;
  toppingsArugula: string;
  toppingsPineapple: string;
  toppings: string;
  comments: string;
}

export interface OrderSummary {
  orderId: number;
  name: string;
  email: string;
  amount: number;
}
