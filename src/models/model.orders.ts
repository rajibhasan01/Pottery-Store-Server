class Order {
  title?: string;
  amount?: number;
  cashType?: string;
  imageName?: string;
  imagePath?: string;
  createdAt?: Date;
  createdBy?: string;

  private static order: Order;

  private constructor() {}

  public static getInstance() {
    if (!Order.order) {
      Order.order = new Order();
    }
    return Order.order;
  }
}

export { Order };
