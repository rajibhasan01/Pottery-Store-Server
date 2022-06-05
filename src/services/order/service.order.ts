import { DbOrder } from './db.order';
import { Order } from '../../models/model.orders';
import { OrderInterface } from '../../interfaces/interface.orders';

const dbOrder = DbOrder.getInstance();

export class OrderService implements OrderInterface {
  public static orderService: OrderService;
  private constructor() {}
  public static getInstance() {
    if (!OrderService.orderService) {
      OrderService.orderService = new OrderService();
    }
    return OrderService.orderService;
  }
  async AddOrder(orderData: Order) {
    try {
      return await new Promise((resolve, reject) => {
        dbOrder
          .CreateOrder(orderData)
          .then((res) => resolve(res))
          .catch((err) => reject('Failed to add order. Please try again'));
      });
    } catch (err) {
      console.log('error in Addorder method of orderService Class: ', err);
    }
  }
  async EditOrder(orderId: string, orderData: Order) {
    try {
      return await new Promise((resolve, reject) => {
        dbOrder
          .EditOrder(orderId, orderData)
          .then((res) => resolve('order Edit Successfully'))
          .catch((err) => reject('Failed to Edit order. Please try again'));
      });
    } catch (err) {
      console.log('error in Editorder method of orderService Class: ', err);
    }
  }
  async GetAllOrder() {
    try {
      return await new Promise((resolve, reject) => {
        dbOrder
          .GetAllOrder()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetAllorder method of orderService Class: ',
        err
      );
    }
  }
  async GetOrderById(orderId: string) {
    try {
      return await new Promise((resolve, reject) => {
        dbOrder
          .GetOrderById(orderId)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetorderById method of orderService Class: ',
        err
      );
    }
  }

  async GetOrderBySearch(search: any) {
    try {
      return await new Promise((resolve, reject) => {
        dbOrder
          .GetOrderBySearch(search)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetorderById method of orderService Class: ',
        err
      );
    }
  }
  async DeleteorderById(orderId: string) {
    try {
      return await new Promise((resolve, reject) => {
        dbOrder
          .DeleteOrderById(orderId)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetorderById method of orderService Class: ',
        err
      );
    }
  }

}
