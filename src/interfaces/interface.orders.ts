import { Order } from '../models/model.orders';

export interface OrderInterface {
  AddOrder(orderData: Order): any;
  EditOrder(orderId: string, invoiceData: Order): any;
  GetAllOrder(): any;
  GetOrderById(ordertId: string): any;
}
